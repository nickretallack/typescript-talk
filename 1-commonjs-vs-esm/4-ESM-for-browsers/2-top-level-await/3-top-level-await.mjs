// But it works in ESM!
console.log("Just a moment...");
await new Promise((resolve) => setTimeout(resolve, 1000));
console.log("Hello, world!");
