/*
If you omit it the file extension,
Typescript might still resolve the file in your editor,
but the typescript compiler `tsc` won't fix it in the build.

If you build this as CommonJS, it will work in node,
but if you build this as ESM, it will break.

For this code to work in ESM,
it would need to go through a bundler of some sort
that supports discovering file extensions.

ESM never supported guessing file extensions in web browsers
because it would be very costly to do multiple network requests
just to figure out what a file's real file extension is.
*/
import { hello } from "./example/index.js";

hello();
