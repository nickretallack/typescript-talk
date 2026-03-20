import lib from "#src/lib";
lib();

// We can create a require function in ESM using `createRequire()`.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

// If we `require()` it, we get the `require` condition.
const CJS = require("#src/lib");
CJS();
