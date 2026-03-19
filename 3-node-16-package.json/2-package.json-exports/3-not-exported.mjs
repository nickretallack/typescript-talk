// This would work if the module didn't have an exports field in its package.json.
// Try deleting that field from the package.json and running this.
import privateThing from "some-package/private.js";

privateThing();
