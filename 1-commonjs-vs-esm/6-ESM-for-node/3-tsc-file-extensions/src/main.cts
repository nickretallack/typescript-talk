import Default, { hello } from "./lib.js";

Default();
hello();

import * as starModule from "./lib.js";

starModule.default();
starModule.hello();

// @ts-expect-error - no top-level await in CJS
const asyncModule = await import("./lib.js");

asyncModule.default();
asyncModule.hello();
