import { defineConfig } from "vite";
import { browserImportMapPlugin } from "./plugins/vite-plugin-browser-importmap";

export default defineConfig({
  plugins: browserImportMapPlugin(),
});
