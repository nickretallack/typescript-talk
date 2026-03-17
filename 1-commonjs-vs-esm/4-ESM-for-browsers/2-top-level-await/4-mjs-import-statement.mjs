/*
Let's import that previous example in another ESM file.

What order do you think the log statements will print?
*/

console.log("Before import ---");
import "./3-top-level-await.mjs";
console.log("After import ---");
