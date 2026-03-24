/* This app depends on lib, which uses is-odd in its runtime code.
But lib declared is-odd as a devDependency, not a regular dependency.

After a normal install, devDependencies are included, so this works fine.
But after a production install (yarn workspaces focus --all --production),
is-odd is not installed, and lib's import of is-odd will fail.

This demonstrates why devDependencies should only contain
development-time tools, not runtime code your library needs. */
import { checkOdd } from "lib";

console.log("checkOdd(1):", checkOdd(1));
console.log("checkOdd(2):", checkOdd(2));
