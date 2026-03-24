// The app explicitly provides the peer dependency.
import { checkNumber } from "lib/use-peer.js";
console.log("Is 42 a number?", checkNumber(42));
