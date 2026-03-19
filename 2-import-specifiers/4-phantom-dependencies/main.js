/* NPM dependencies.
Run ./install.sh to install dependencies with npm.

Since node never consults package.json when resolving dependencies,
it's easy to end up resolving dependencies you never declared,
just because they happen to exist inside node_modules.

For example, if you depend on a package (is-odd) */
import isOdd from "is-odd";

console.log("isOdd(1): ", isOdd(1));

/* which depends on another package (is-number)
there's nothing stopping you from importing the transitive dependency (is-number). */
import isNumber from "is-number";

console.log("isNumber(1): ", isNumber(1));

/* This can be bad, since upgrading the direct dependency (is-odd)
could result in the transitive dependency being upgraded or even removed. 

Declaring your dependencies in package.json doesn't stop you from
importing dependencies from outside the project either. */
import DistantExamplePackage from "distant_example";

DistantExamplePackage();
