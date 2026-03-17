/* 
When you compile your code with `tsc`,
it won't change the import specifiers.

Therefore, when importing a `.ts` file,
you should actually import it as `.js` instead,
because that's what the file is going to be called
after it's compiled and placed in `dist`.

That's the file extension that node will use.
*/
import { hello } from "./example/index.js";

hello();
