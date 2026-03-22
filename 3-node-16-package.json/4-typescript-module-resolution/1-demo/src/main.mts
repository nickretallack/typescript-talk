// If typescript can find the .js file, it will look for a .d.ts file with the same name.
import normalThing from "normal-package/thing";
normalThing();

/* If your .d.ts file isn't where typescript expects it to be,
you can use the "types" condition to tell typescript where to look. */
import splitThing from "split-package/thing";
splitThing();

/* It evaluates conditions in the order they are listed in package.json.
In this example, there are two .d.ts files:
One is next to the default .js file,
the other is somewhere eles.
Since "default" is listed before "types",
the .d.ts file there is the one that will be used. */
import wrongOrderThing from "wrong-order-package/thing";
// @ts-expect-error - gets an incompatible declaration
wrongOrderThing();

// If there was no .d.ts file there, it would have moved on to the "types" condition.
import wrongOrderNotAmbiguousThing from "wrong-order-not-ambiguous/thing";
wrongOrderNotAmbiguousThing();
