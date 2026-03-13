import Default, { hello } from "./lib.mjs";

Default();
hello();

// Import star syntax.
// It bundles all the exports into a single object.
// The default export is attached as a property called "default".
// This .default property is the source of interop issues!
import * as starModule from "./lib.mjs";

starModule.default();
starModule.hello();

// Asynchronous import function.
// Similar to the import star syntax, but not statically analyzed in advance.
const asyncModule = await import("./lib.mjs");

asyncModule.default();
asyncModule.hello();
