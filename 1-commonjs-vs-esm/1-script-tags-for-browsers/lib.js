/*
To export things, you'd attach them to the global `window` object.
*/
window.hello1 = () => {
  console.log("Hello from an explicit global in a script tag!");
};

/*
`window` is actually the default context,
so any stray definitions end up being attached to it,
making these interchangeable.
*/
const hello2 = () => {
  console.log("Hello from an implicit global in a script tag!");
};
