import normalThing from "normal-package/thing";
normalThing();

import splitThing from "split-package/thing";
splitThing();

import wrongOrderThing from "wrong-order-package/thing";
// @ts-expect-error - gets an incompatible declaration
wrongOrderThing();
