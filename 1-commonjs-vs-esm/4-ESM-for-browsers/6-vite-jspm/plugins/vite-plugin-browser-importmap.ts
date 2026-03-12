import path from "node:path";
import { pathToFileURL } from "node:url";
import { promises as fs } from "node:fs";
import { createRequire } from "node:module";
import { init, parse } from "es-module-lexer";
import { transform } from "esbuild";
import { Generator } from "@jspm/generator";
import type { Plugin, ResolvedConfig, ViteDevServer } from "vite";

type ImportMapPluginOptions = {
  entryHtml?: string;
};

function isBareSpecifier(specifier: string): boolean {
  return (
    !specifier.startsWith(".") &&
    !specifier.startsWith("/") &&
    !specifier.startsWith("#") &&
    !specifier.includes(":")
  );
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveImportToFile(
  root: string,
  importer: string,
  specifier: string,
): Promise<string | null> {
  const rawPath = specifier.startsWith("/")
    ? path.join(root, specifier.slice(1))
    : path.resolve(path.dirname(importer), specifier);
  const candidates = [
    rawPath,
    `${rawPath}.ts`,
    `${rawPath}.tsx`,
    `${rawPath}.js`,
    `${rawPath}.jsx`,
    `${rawPath}.mjs`,
    `${rawPath}.mts`,
    path.join(rawPath, "index.ts"),
    path.join(rawPath, "index.tsx"),
    path.join(rawPath, "index.js"),
    path.join(rawPath, "index.jsx"),
    path.join(rawPath, "index.mjs"),
  ];
  for (const candidate of candidates) {
    if (await fileExists(candidate)) return candidate;
  }
  return null;
}

async function collectModuleImports(
  root: string,
  entryFiles: string[],
): Promise<Set<string>> {
  await init;
  const discovered = new Set<string>();
  const visited = new Set<string>();
  const queue = [...entryFiles];

  while (queue.length > 0) {
    const file = queue.pop();
    if (!file || visited.has(file)) continue;
    visited.add(file);

    if (!/\.(ts|tsx|js|jsx|mjs|mts)$/.test(file)) continue;

    const source = await fs.readFile(file, "utf8");
    const ext = path.extname(file).slice(1) as
      | "ts"
      | "tsx"
      | "js"
      | "jsx"
      | "mjs"
      | "mts";
    const { code } = await transform(source, {
      loader: ext === "mts" ? "ts" : ext,
      format: "esm",
      jsx: "automatic",
      jsxDev: true,
      target: "esnext",
      sourcemap: false,
    });

    const [imports] = parse(code);
    for (const token of imports) {
      const specifier = code.slice(token.s, token.e);
      if (isBareSpecifier(specifier)) {
        discovered.add(specifier);
        continue;
      }
      if (specifier.startsWith(".") || specifier.startsWith("/")) {
        const resolved = await resolveImportToFile(root, file, specifier);
        if (resolved) queue.push(resolved);
      }
    }
  }

  return discovered;
}

async function readEntryModulesFromHtml(
  root: string,
  entryHtml: string,
): Promise<string[]> {
  const htmlPath = path.resolve(root, entryHtml);
  const html = await fs.readFile(htmlPath, "utf8");
  const matches = [
    ...html.matchAll(
      /<script[^>]*type=["']module["'][^>]*src=["']([^"']+)["']/g,
    ),
  ];
  const modules = matches
    .map((match) => match[1])
    .filter(
      (specifier) => specifier.startsWith("/") || specifier.startsWith("."),
    );

  const resolved = await Promise.all(
    modules.map((specifier) => resolveImportToFile(root, htmlPath, specifier)),
  );
  return resolved.filter((value): value is string => Boolean(value));
}

export function browserImportMapPlugin(
  options: ImportMapPluginOptions = {},
): Plugin[] {
  const entryHtml = options.entryHtml ?? "index.html";
  let config: ResolvedConfig;
  let server: ViteDevServer | undefined;
  let importMapJson = "{}";
  let bareImports = new Set<string>();
  let mapBuildPromise: Promise<void> | null = null;
  let requireFromRoot: ReturnType<typeof createRequire> | undefined;

  async function rebuildImportMap() {
    const entryModules = await readEntryModulesFromHtml(config.root, entryHtml);
    bareImports = await collectModuleImports(config.root, entryModules);
    if (bareImports.has("react")) {
      bareImports.add("react/jsx-runtime");
      bareImports.add("react/jsx-dev-runtime");
    }
    if (bareImports.size === 0) {
      importMapJson = "{}";
      return;
    }

    const generator = new Generator({
      mapUrl: pathToFileURL(path.join(config.root, "importmap.json")).href,
      env: [
        "browser",
        config.command === "serve" ? "development" : "production",
        "module",
      ],
    });

    await generator.install([...bareImports].sort());
    const map = generator.getMap();
    map.imports ??= {};
    const bareImportEntries = Object.entries(map.imports).filter(
      ([specifier]) => isBareSpecifier(specifier),
    );

    // Vite rewrites bare imports to /@id/* in dev.
    // Mirror those entries so browser import maps still redirect to CDN.
    for (const [specifier, target] of bareImportEntries) {
      map.imports[`/@id/${specifier}`] = target;

      // When optimizeDeps is disabled, Vite can rewrite to /node_modules/... paths.
      // Mirror those too, using Node resolution from project root.
      if (requireFromRoot) {
        try {
          const resolvedFile = requireFromRoot.resolve(specifier);
          const marker = `${path.sep}node_modules${path.sep}`;
          const markerIndex = resolvedFile.lastIndexOf(marker);
          if (markerIndex >= 0) {
            const relativeInNodeModules = resolvedFile
              .slice(markerIndex + marker.length)
              .split(path.sep)
              .join("/");
            map.imports[`/node_modules/${relativeInNodeModules}`] = target;
          }
        } catch {
          // ignore unresolved entries; bare specifier and /@id mapping still exist
        }
      }
    }

    importMapJson = JSON.stringify(map, null, 2);
  }

  function ensureImportMapBuild(): Promise<void> {
    if (!mapBuildPromise) {
      mapBuildPromise = rebuildImportMap().finally(() => {
        mapBuildPromise = null;
      });
    }
    return mapBuildPromise;
  }

  return [
    {
      name: "browser-import-map:config",
      enforce: "pre",
      config() {
        return {
          optimizeDeps: {
            noDiscovery: true,
            include: [],
          },
        };
      },
      configResolved(resolvedConfig) {
        config = resolvedConfig;
        requireFromRoot = createRequire(path.join(config.root, "package.json"));
      },
      async buildStart() {
        await ensureImportMapBuild();
      },
      configureServer(devServer) {
        server = devServer;
        void ensureImportMapBuild();
        devServer.middlewares.use(async (_req, _res, next) => {
          try {
            await ensureImportMapBuild();
            next();
          } catch (error) {
            next(error as Error);
          }
        });
        const watchedRoot = path.resolve(config.root, "src");
        devServer.watcher.on("add", async (file) => {
          if (file.startsWith(watchedRoot)) await ensureImportMapBuild();
        });
        devServer.watcher.on("change", async (file) => {
          if (file.startsWith(watchedRoot)) await ensureImportMapBuild();
        });
        devServer.watcher.on("unlink", async (file) => {
          if (file.startsWith(watchedRoot)) await ensureImportMapBuild();
        });
      },
    },
    {
      name: "browser-import-map:html",
      enforce: "post",
      transformIndexHtml: {
        order: "post",
        async handler(html) {
          await ensureImportMapBuild();
          return {
            html,
            tags: [
              {
                tag: "script",
                children:
                  "globalThis.process ??= { env: { NODE_ENV: " +
                  JSON.stringify(
                    config.command === "serve" ? "development" : "production",
                  ) +
                  " } };",
                injectTo: "head-prepend",
              },
              {
                tag: "script",
                attrs: {
                  src: "https://ga.jspm.io/npm:es-module-shims@2.8.0/dist/es-module-shims.js",
                  async: true,
                },
                injectTo: "head-prepend",
              },
              {
                tag: "script",
                attrs: { type: "importmap" },
                children: importMapJson,
                injectTo: "head-prepend",
              },
            ],
          };
        },
      },
    },
    {
      name: "browser-import-map:invalidate",
      enforce: "post",
      handleHotUpdate({ file }) {
        if (!server) return;
        if (!file.startsWith(path.resolve(config.root, "src"))) return;
        mapBuildPromise = null;
      },
    },
  ];
}
