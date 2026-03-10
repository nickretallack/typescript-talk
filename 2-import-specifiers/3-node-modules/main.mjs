import ExamplePackage from "example";
import ExamplePackageSubpath from "example/thing/stuff.js";

import ExamplePackageInOrg from "@example/example";
import ExamplePackageInOrgSubpath from "@example/example/thing/stuff.js";

import DistantExamplePackage from "distant_example";

ExamplePackage();
ExamplePackageSubpath();

ExamplePackageInOrg();
ExamplePackageInOrgSubpath();

DistantExamplePackage();
