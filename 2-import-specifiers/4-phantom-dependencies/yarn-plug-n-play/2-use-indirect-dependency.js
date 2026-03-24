// If you try to import an indirect dependency, yarn will throw an error.
import isNumber from "is-number";

console.log("isNumber(1): ", isNumber(1));
