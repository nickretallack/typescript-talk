const path = require("path");
module.exports = {
  entry: "./main.cjs",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, `dist`),
  },
  target: "web",
};
