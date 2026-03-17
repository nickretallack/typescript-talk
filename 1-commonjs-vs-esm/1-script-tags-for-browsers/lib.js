/*
To export things, you'd attach them to the global `window` object.
*/
window.helloWindow = () => {
  console.log("Hello from an explicit global in a script tag!");
};

/*
`window` is actually the default context,
so stray var and function declarations end up being attached to it.
*/
var helloVar = () => {
  console.log("Hello from a var in a script tag!");
};

function helloFunction() {
  console.log("Hello from a function in a script tag!");
}

/*
Newer keywords like `let` and `const` do not get attached to `window`,
but they still end up in the global scope anyway.
*/
let helloLet = () => {
  console.log("Hello from a let in a script tag!");
};

const helloConst = () => {
  console.log("Hello from a const in a script tag!");
};
