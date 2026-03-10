// a file in the current directory
import "./lib.js";

// something deeply nested
import "./lib/example/foo.js";

// without a file extension
import "./thing";

// going up
import "../../../something.js";

// even this counts as local
import "/root.js";
