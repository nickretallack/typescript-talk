// You can import individual values as well as the default value at the same time.
import Default, { hello } from "./lib.mjs";

Default();
hello();

/* You can also bundle all the individual exports and the default export 
into a single object using the import star syntax.
The default export is attached as a property called `default`.

This `default` property is probably the biggest oversight in this module system.
It has lead to a lot of interoperability issues.
It's why the tsconfig.json setting esModuleInterop exists,
as well as the rollup output.interop setting.
Both of these add additional code to check if you wanted the module as is,
or if you wanted to use the `.default` property. */
import * as starModule from "./lib.mjs";

starModule.default();
starModule.hello();

/* There's also an asynchronous import function.
It functions similarly to the import star syntax,
but it's not statically analyzed in advance,
so it can be used for dynamic imports at runtime. */
const asyncModule = await import("./lib.mjs");

asyncModule.default();
asyncModule.hello();
