import path from "node:path";
import { promises as fs } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, "dist");
const appRoot = path.join(distRoot, "app");
const publicRoot = path.join(projectRoot, "public");
const sourceCss = path.join(projectRoot, "src", "style.css");
const outputCss = path.join(appRoot, "style.css");
const importMapPath = path.join(distRoot, "importmap.json");
const indexHtmlPath = path.join(distRoot, "index.html");
const indexTemplatePath = path.join(projectRoot, "index.html");

await fs.rm(distRoot, { recursive: true, force: true });
await fs.mkdir(appRoot, { recursive: true });

await execFileAsync("npx", ["tsc", "-p", "tsconfig.emit.json"], {
  cwd: projectRoot,
});

await fs.copyFile(sourceCss, outputCss);
await fs.cp(publicRoot, distRoot, { recursive: true });

await execFileAsync("node", ["scripts/generate-importmap.mjs"], {
  cwd: projectRoot,
});

const importMap = await fs.readFile(importMapPath, "utf8");
const template = await fs.readFile(indexTemplatePath, "utf8");
const html = template.replace("__IMPORT_MAP__", importMap);

await fs.writeFile(indexHtmlPath, html);
