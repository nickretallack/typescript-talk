// We can use the exports they declared.

// This usses the '.' export.
import something from "some-package";
something();

// This uses the './thing' export.
import thing from "some-package/thing";
thing();

// This uses the './some/long/path' export.
import longPath from "some-package/some/long/path";
longPath();

// This uses the './wildcard/*' export.
// Since that export doesn't end in .js, we need to provide the file extension.
import wildcard from "some-package/wildcard/nested/thing.js";
wildcard();

// This uses the './wildcard-js/*' export.
// Since that export ends in .js, we don't need to provide the file extension.
import wildcardjs from "some-package/wildcard-js/nested/thing";
wildcardjs();
