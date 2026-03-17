/* In browsers, you can even import things from other origins.
Perhaps you'd like to get your dependencies from a CDN? */
import { createElement } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";

const root = createRoot(document.getElementById("root"));
root.render(createElement("h1", null, "Hello, world!"));
