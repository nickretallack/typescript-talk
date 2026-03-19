////////////// Local imports //////////////
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

////////////// Non-local imports //////////////
// Maybe a typescript alias?
import "lib";

// Maybe a package dependency?
import "react";

// a subpath import
import "#src/something.js";

// A package in an organization
import "@scale/shared";

// A subpath within a package in an organization
import "@scale/shared/feature";
