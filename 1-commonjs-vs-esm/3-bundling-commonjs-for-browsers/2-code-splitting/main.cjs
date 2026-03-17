/* Webpack was so eager to support code-splitting
that they made the dynamic import function from ESM available in CommonJS
before ESM was even released.
*/

import("./lib.cjs").then((module) => {
  module.hello();
});
