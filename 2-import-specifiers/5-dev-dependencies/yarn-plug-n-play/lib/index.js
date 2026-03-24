/* This library has is-odd listed as a devDependency in its package.json.

Dev dependencies are meant for development-only tools like test frameworks,
linters, and build tools. They should not be used in runtime code.

But nothing stops you from importing a devDependency in your runtime code: */
import isOdd from "is-odd";

export function checkOdd(n) {
  return isOdd(n);
}
