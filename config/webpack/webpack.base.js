const { resolve } = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

/**
 * Environment variables and path generation
 */

function loadEnvironmentRuntimeSettings() {
  function determineEnvironmentFile() {
    const event = process.env.npm_lifecycle_event;

    // prettier-ignore
    if (event === "start") {
      return ".env.development";
    }
    else if (event === "staging") {
      return ".env.staging";
    }
    else if (event === "production") {
      return ".env.production";
    }
    else {
      throw new Error(
        "Unexpected build script run from package.json, expecting one of `start`, `staging`, or `production` in `process.env.npm_lifecycle_event`"
      );
    }
  }

  const common = dotenv.config({
    path: resolve("config", ".env.common"),
  });

  const application = dotenv.config({
    path: resolve("config", determineEnvironmentFile()),
  });

  if (common.error || application.error) {
    throw environment.error;
  }

  return Object.assign({}, common.parsed, application.parsed);
}

const environment = loadEnvironmentRuntimeSettings();
const path = environment.ACME_PATH;
const publicPath = environment.ACME_PUBLIC_PATH;
const environmentStringified = {
  "process.env": Object.keys(environment).reduce((env, key) => {
    env[key] = JSON.stringify(environment[key]);
    return env;
  }, {}),
};

// resolve path
const pathParts = path.split("/");
const pathResolved = resolve(...pathParts);

/**
 * Webpack config
 */

module.exports = {
  devtool: "source-map",
  entry: [
    "whatwg-fetch", // polyfill required for fetch in ie11
    "babel-polyfill", // emulates ES2015 environment for browsers on runtime
    resolve("src", "index.tsx"), // app entry point
  ],
  output: {
    filename: "js/bundle.js",
    path: pathResolved, // full path to output folder,
    publicPath, //  URL version of your `output.path` but from the view of the HTML page.
  },
  resolve: {
    alias: {
      Source: resolve("src"),
      Assets: resolve("src", "assets"),
      Images: resolve("src", "assets", "img"),
      Components: resolve("src", "components"),
      Containers: resolve("src", "containers"),
      Pages: resolve("src", "pages"),
      Redux: resolve("src", "redux"),
      Modules: resolve("src", "redux", "modules"),
      Router: resolve("src", "router"),
      Utils: resolve("src", "utils"),
    },
    // allows js and jsx file import without specifying the extension
    extensions: [".ts", ".tsx", ".js", "jsx"],
  },
  plugins: [
    // make environment variables available in js code
    // e.g. if (process.env.NODE_ENV === 'development') {...}
    new webpack.DefinePlugin(environmentStringified),
  ],
};
