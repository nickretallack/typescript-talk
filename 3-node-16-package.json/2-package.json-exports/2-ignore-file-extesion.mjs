// in MJS,
// if neither the import nor the export provide the file extension,
// node will break.
import wildcard from "some-package/wildcard/nested/thing";
wildcard();
