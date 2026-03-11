const path = require("path");
module.exports = {
  mode: "production",
  entry: "./main.cjs",
  output: {
    filename: "webpack/bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "web",
};
