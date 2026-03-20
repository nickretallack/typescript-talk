// If we `import` it, we get the `import` condition.
import ESM from "some-package";
ESM();

// We can create a require function in ESM using `createRequire()`.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

// If we `require()` it, we get the `require` condition.
const CJS = require("some-package");
CJS();
