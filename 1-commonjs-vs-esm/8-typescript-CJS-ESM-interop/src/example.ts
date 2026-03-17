import fs1 from "node:fs";

/* @types/node brings in a type for `require()` even in .mjs files,
even if it won't actually work in the compiled code.
Also, typescript won't type check what you imported with require()... */
const fs2 = require("node:fs");
// ...unless you use this special syntax:
import fs3 = require("node:fs");

export default fs1;
export { fs1, fs2, fs3 };
