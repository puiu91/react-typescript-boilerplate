const { resolve } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * Config files
 */

const webpackBaseConfig = require("./webpack.base");
const htmlWebpackPluginSettings = require("./plugins/htmlWebpackPlugin.config");
const extractCss = require("./plugins/extractCss");

/**
 * File handling rules
 */

const rules = require("./rules/generateRules");

/**
 * Webpack config
 */

module.exports = Object.assign({}, webpackBaseConfig, {
  devtool: "none",
  module: {
    rules,
  },
  plugins: [
    // must manually merge base plugins before adding environment specific ones
    ...webpackBaseConfig.plugins,

    // Must use both the same plugin and variable name as the one used when in the css loaders configuration file
    extractCss,
    new HtmlWebpackPlugin(
      Object.assign({}, htmlWebpackPluginSettings, {
        title: process.env.ACME_APPLICATION_NAME,
      })
    ),
    // copies individual files or entire directories to the build directory.
    new CopyWebpackPlugin([{ from: resolve("public"), to: resolve("build") }], {
      ignore: ["*.ejs"],
    }),
  ],
});
