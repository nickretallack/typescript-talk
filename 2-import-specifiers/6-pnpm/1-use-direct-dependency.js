/* PNPM came after Yarn Plug'n'Play.

It also supports Plug'n'Play,
but it also has its own way of fixing the phantom dependencies issue
while still using node_modules and regular node module resolution.

It does this by hiding the dependencies node shouldn't resolve in node_modules/.pnpm.

Notice that this dependency appears in node_modules:
*/
import isOdd from "is-odd";

console.log("isOdd(1): ", isOdd(1));
