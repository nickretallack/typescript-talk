/* Yarn Plug'n'Play replaces the way node resolves modules.
Setup: Run ./install.sh to install dependencies with yarn.

It removes the node_modules directory
and does all module resolution through a file it generates called pnp.cjs.
This file is generated based on what's in your package.json file.

You have to invoke node with special flags to make it use the .pnp.cjs file though, like this:

    yarn node 1-use-direct-dependency.js

Which essentially does this:

    node --require=./.pnp.cjs --experimental-loader=./.pnp.loader.mjs 1-use-direct-dependency.js

The dependencies actually exist in zip files in ~/.yarn/berry/cache by default.

Importing a direct dependency should work:
*/
import isOdd from "is-odd";

console.log("isOdd(1): ", isOdd(1));
