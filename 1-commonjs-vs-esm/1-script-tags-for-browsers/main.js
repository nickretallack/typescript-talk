// Only the old types of declarations end up being attached to `window`.
window.helloWindow();
window.helloVar();
window.helloFunction();

// The new types, `let` and `const`, are not attached to `window`.
try {
  window.helloLet();
} catch (error) {
  console.error(error);
}

try {
  window.helloConst();
} catch (error) {
  console.error(error);
}

// All are available in the global scope anyway though.
helloWindow();
helloVar();
helloFunction();
helloLet();
helloConst();
