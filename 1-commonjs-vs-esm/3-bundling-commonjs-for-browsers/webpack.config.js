const path = require("path");
module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./main.cjs",
  output: {
    filename: `webpack-${process.env.NODE_ENV}-bundle.js`,
    path: path.resolve(__dirname, `dist`),
  },
  target: "web",
};
