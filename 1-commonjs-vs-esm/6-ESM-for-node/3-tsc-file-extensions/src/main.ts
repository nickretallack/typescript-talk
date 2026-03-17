import Default, { hello } from "./lib.js";

Default();
hello();

import * as starModule from "./lib.js";

starModule.default();
starModule.hello();

const asyncModule = await import("./lib.js");

asyncModule.default();
asyncModule.hello();
