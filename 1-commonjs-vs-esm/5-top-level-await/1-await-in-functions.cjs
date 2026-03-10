async function hello() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Hello, world!");
}

console.log("Just a moment...");
hello();
