// The app provides the optional peer dependency.
import { checkPositive } from "lib/use-optional-peer.js";
console.log("Is 42 positive?", await checkPositive(42));
