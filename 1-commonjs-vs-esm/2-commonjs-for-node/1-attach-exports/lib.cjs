/*
Then NodeJS came along, as a way to run JavaScript outside the browser, on the server side.
Since there's no browser, there's no DOM, no <sccript> tags, so they needed another way to import files.

What they came up with is called CommonJS.
*/

// To export things, attach them to module.exports
module.exports.hello1 = () => {
  console.log("Hello from a CommonJS export on module.exports!");
};

// `module` can be implied, just like `window` can.
exports.hello2 = () => {
  console.log("Hello from a CommonJS export on exports!");
};
