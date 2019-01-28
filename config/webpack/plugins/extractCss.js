const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCss = new ExtractTextPlugin({
  filename: "css/styles.css",
});

module.exports = extractCss;
