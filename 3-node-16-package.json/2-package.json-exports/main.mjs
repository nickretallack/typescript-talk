import ESM from "some-package";
ESM();

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const CJS = require("some-package");
CJS();
