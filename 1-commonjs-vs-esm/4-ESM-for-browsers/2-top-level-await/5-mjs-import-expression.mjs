/*
Perhaps that was a surprise!

It fully ran the imported code in advance,
before it ran anything from the importing file at all.
This is because import statements are statically analyzed,
separately from the code that uses them.

This allows your browser to discover the whole waterfall of imports
in advance, before running any of the code.

Here's what happens if you use the dynamic import function instead:
*/

console.log("Before import ---");
await import("./3-top-level-await.mjs");
console.log("After import ---");
