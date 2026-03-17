/*
Unlike CommonJS, ESM doesn't primarily use functions (require) or objects (module.exports).

Instead, they added two new statements to the language:
* import
* export
*/

// You can export values individually.
export const hello = () => {
  console.log("Hello from a named export!");
};

// You can also export a default value.
export default () => {
  console.log("Hello from a default export!");
};

// Unlike in CommonJS, you can export individual values and a default value from the same module.
