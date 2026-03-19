/* Browser builtins are all global,
but NodeJS has some built-in modules you can import.
Traditionally, you'd just import them with their name.... */
import fs1 from "fs";

/* However, Node eventually added an alternative way to import them
that makes it explicit you're looking for the Node builtin. */
import fs2 from "node:fs";

// You get the same thing either way.
console.log(fs1.readFileSync("1-bare-builtins.mjs", "utf8"));
console.log(fs2.readFileSync("1-bare-builtins.mjs", "utf8"));
