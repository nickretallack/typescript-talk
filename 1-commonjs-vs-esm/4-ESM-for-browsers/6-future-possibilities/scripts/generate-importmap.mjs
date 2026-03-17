import path from "node:path";
import { promises as fs } from "node:fs";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { init, parse } from "es-module-lexer";
import { Generator } from "@jspm/generator";

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, "dist");
const appRoot = path.join(distRoot, "app");
const importMapPath = path.join(distRoot, "importmap.json");
const requireFromRoot = createRequire(path.join(projectRoot, "package.json"));

function isBareSpecifier(specifier) {
  return (
    !specifier.startsWith(".") &&
    !specifier.startsWith("/") &&
    !specifier.startsWith("#") &&
    !specifier.includes(":")
  );
}

function parsePackageSpecifier(specifier) {
  const segments = specifier.split("/");
  if (specifier.startsWith("@")) {
    const pkg = `${segments[0]}/${segments[1]}`;
    const subpath = segments.slice(2).join("/");
    return { pkg, subpath };
  }
  const pkg = segments[0];
  const subpath = segments.slice(1).join("/");
  return { pkg, subpath };
}

async function resolvePackageVersion(pkgName) {
  const packageJsonPath = requireFromRoot.resolve(`${pkgName}/package.json`);
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
  return packageJson.version;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveRelativeImport(importer, specifier) {
  const rawPath = specifier.startsWith("/")
    ? path.join(distRoot, specifier.slice(1))
    : path.resolve(path.dirname(importer), specifier);
  const candidates = [rawPath, `${rawPath}.js`, path.join(rawPath, "index.js")];
  for (const candidate of candidates) {
    if (await fileExists(candidate)) return candidate;
  }
  return null;
}

async function collectBareSpecifiers(entryFile) {
  await init;
  const visited = new Set();
  const queue = [entryFile];
  const bare = new Set();

  while (queue.length > 0) {
    const file = queue.pop();
    if (!file || visited.has(file)) continue;
    visited.add(file);

    const source = await fs.readFile(file, "utf8");
    const [imports] = parse(source);
    for (const token of imports) {
      const specifier = source.slice(token.s, token.e);
      if (isBareSpecifier(specifier)) {
        bare.add(specifier);
        continue;
      }
      if (specifier.startsWith(".") || specifier.startsWith("/")) {
        const resolved = await resolveRelativeImport(file, specifier);
        if (resolved) queue.push(resolved);
      }
    }
  }

  return bare;
}

const entryFile = path.join(appRoot, "main.js");
const bareSpecifiers = await collectBareSpecifiers(entryFile);

const installs = [];
const seenTargets = new Set();

for (const specifier of [...bareSpecifiers].sort()) {
  const { pkg, subpath } = parsePackageSpecifier(specifier);
  const version = await resolvePackageVersion(pkg);
  const baseTarget = `${pkg}@${version}`;

  if (!subpath) {
    if (!seenTargets.has(baseTarget)) {
      installs.push(baseTarget);
      seenTargets.add(baseTarget);
    }
    continue;
  }

  const subpathTarget = `${baseTarget}/${subpath}`;
  if (!seenTargets.has(subpathTarget)) {
    installs.push(subpathTarget);
    seenTargets.add(subpathTarget);
  }
}

const generator = new Generator({
  mapUrl: pathToFileURL(importMapPath).href,
  env: ["browser", "production", "module"],
});

await generator.install(installs);

await fs.writeFile(importMapPath, JSON.stringify(generator.getMap(), null, 2));
