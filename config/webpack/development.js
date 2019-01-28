const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * Config files
 */

const webpackBaseConfig = require("./webpack.base");
const htmlWebpackPluginSettings = require("./plugins/htmlWebpackPlugin.config");

/**
 * File handling rules
 */

const rules = require("./rules/generateRules");

/**
 * Webpack config
 */

module.exports = Object.assign({}, webpackBaseConfig, {
  entry: [
    "whatwg-fetch", // polyfill required for fetch in ie11
    "babel-polyfill", // emulates ES2015 environment for browsers on runtime
    "react-hot-loader/patch", // activate HMR for React
    "webpack-dev-server/client?http://localhost:8080", // bundle the client for webpack-dev-server and connect to the provided endpoint
    "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
    resolve("src", "index.tsx"), // app entry point
  ],
  module: {
    rules,
  },
  plugins: [
    // must manually merge base plugins before adding environment specific ones
    ...webpackBaseConfig.plugins,

    // development specific plugins
    new HtmlWebpackPlugin(
      Object.assign({}, htmlWebpackPluginSettings, {
        // set sample custom option to false in development
        isCustomOption: false,
        // these settings are different from staging and production settings since the webpackDevServer will be running from the `./public` folder
        filename: resolve("public", "index.html"),
        template: resolve("public", "index.ejs"),
        // no minification required in development
        minify: {},
      })
    ),
    // necessary to emit hot updates (currently supports CSS only)
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    contentBase: resolve("public"), // root where index.html is loaded
    historyApiFallback: true, // allows access to dev server from arbitrary url (needed to load a route like `/users/5` for react-router),
    hot: true, // enable HMR on the server (i.e., webpack-dev-serer) by exposing the `module.hot` api to javascript code
    inline: true,
    publicPath: "/", // match the output `publicPath`
  },
});
