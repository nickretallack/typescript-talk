/* But this one doesn't.
It's actually hidden in node_modules/.pnpm
where node can't find it.
*/
import isNumber from "is-number";

console.log("isNumber(1): ", isNumber(1));
