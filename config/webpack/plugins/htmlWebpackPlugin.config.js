const { resolve } = require("path");

// Pass a custom property name in the object like `customPropName: true`
// which can then be accessed inside of the `.ejs` template file as
// htmlWebpackPlugin.options.customPropName`. Use it to conditionally add or
// remove content as needed.
module.exports = {
  // a custom option used in `.ejs` template
  isCustomOption: true,
  // other options
  title: process.env.ACME_APPLICATION_NAME,
  filename: resolve("build", "index.php"),
  template: resolve("public", "index.ejs"),
  // injection of asset tags is handled in `.ejs` template
  hash: true,
  // suffixes asset filenames with a hash like `styles.css?564201b6c8cc6c0a1d8e` for cache busting
  inject: false,
  minify: {
    collapseWhitespace: false,
    keepClosingSlash: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: false,
    removeStyleLinkTypeAttributes: false,
    useShortDoctype: true,
  },
};
