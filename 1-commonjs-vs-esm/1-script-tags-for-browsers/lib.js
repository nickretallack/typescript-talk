/* It takes extra work not to export things in traditional scripts. */

// You can explicitly attach things to the global `window` object.
window.helloWindow = () => {
  console.log("Hello from an explicit global in a script tag!");
};

// Top level var and function declarations end up being attached to `window` automatically.
var helloVar = () => {
  console.log("Hello from a var in a script tag!");
};

function helloFunction() {
  console.log("Hello from a function in a script tag!");
}

// Newer keywords like `let` and `const` do not get attached to `window`...
// but they still end up in the global scope anyway.
let helloLet = () => {
  console.log("Hello from a let in a script tag!");
};

const helloConst = () => {
  console.log("Hello from a const in a script tag!");
};

// If you really want to hide something from the global scope,
// the general pattern is to put it in the closure of a function...
(function () {
  const helloPrivate = () => {
    console.log("Hello from a private function in a script tag!");
  };

  window.helloPublic = () => {
    helloPrivate();
  };
})(); // and then call that function immediately.
