/*
In CommonJS, imports are synchronous.
You can't do anything asynchronous at the top level,
because it would make the import asynchrounous.

So, this isn't supported in CommonJS:
*/

console.log("Just a moment...");
await new Promise((resolve) => setTimeout(resolve, 1000));
console.log("Hello, world!");