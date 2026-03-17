/*
One of the most significant differences between ESM and CJS
is that ESM allows top-level `await` statements.

In CommonJS you can only use `await` inside `async` functions.
*/

async function hello() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Hello, world!");
}

console.log("Just a moment...");
hello();
