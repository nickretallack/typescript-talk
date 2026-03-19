/* If you import something nonlocal,
Node will look for a matching directory inside the node_modules folder in the current directory.
In this example, I've created an example node_modules folder with two packages in it,
to demonstrate the two kinds of packages: */

// regular packages:
import ExamplePackage from "example";
import ExamplePackageSubpath from "example/thing/stuff.js";
ExamplePackage();
ExamplePackageSubpath();

// scoped packages:
import ExamplePackageInOrg from "@example/example";
import ExamplePackageInOrgSubpath from "@example/example/thing/stuff.js";
ExamplePackageInOrg();
ExamplePackageInOrgSubpath();

/* Scoped package names always begin with @.
When node sees that, it knows the real module name is @example/example, not just @example.
This is important because it determines where it looks for the package's entry point.

Normally, it would look for a package.json file here to determine the package's entry point.
But check it out: there are no package.json files in this example!
So it defaults to using index.js as the entry point.

But the real reason I didn't include package.json is because
I wanted to demonstrate that node doesn't even look at package.json when resolving dependencies.
The dependencies list is only consulted by package managers like npm and yarn.
Node just looks for something in node_modules that matches the import specifier.
If it doesn't find it in the current directory's node_modules,
it goes up to the parent directory and tries again.
It repeats this until it reaches the root of your filesystem. */

// Here it is importing a package that's in the parent directory's node_modules:
import DistantExamplePackage from "distant_example";

DistantExamplePackage();
