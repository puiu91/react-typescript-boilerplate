const { resolve } = require("path");

function determineCssRulesFromEnvironment() {
  const env = process.env.NODE_ENV;
  if (env === "development") {
    return require("./css/development");
  } else if (env === "staging" || env === "production") {
    return require("./css/build");
  } else {
    throw new Error("Unexpected environment in `process.env.NODE_ENV`");
  }
}

module.exports = [
  {
    oneOf: [
      {
        test: [
          /\.(jpg|jpeg)$/,
          /\.bmp$/,
          /\.gif$/,
          /\.png$/
        ],
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.(ts|tsx)$/,
        include: resolve("src"),
        use: [
          { loader: "react-hot-loader/webpack" },
          { loader: "awesome-typescript-loader" },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: resolve("src"),
        loader: "babel-loader",
      },

      // Loads fonts as base64 embedded in css. Alternatively can load fonts as
      // files using "file-loader".
      //
      //    {
      //      test: /\.woff$/,
      //      use: {
      //        loader: require.resolve("file-loader"),
      //        options: { name: "fonts/[hash].[ext]" },
      //      },
      //    }
      //

      {
        test: /\.woff$/,
        use: {
          loader: "url-loader",
          options: { mimetype: "application/font-woff" },
        },
      },
      {
        test: /\.woff2$/,
        use: {
          loader: "url-loader",
          options: { mimetype: "application/font-woff2" },
        },
      },
      {
        test: /\.ttf$/,
        use: {
          loader: "url-loader",
          options: { mimetype: "application/octet-stream" },
        },
      },
      {
        test: /\.eot$/,
        use: {
          loader: "url-loader",
          options: { mimetype: "application/vnd.ms-fontobject" },
        },
      },

      ...determineCssRulesFromEnvironment(),

      // The "file" loader makes sure these assets get served by
      // WebpackDevServer. When you `import` an asset, you get its
      // (virtual) filename.
      //
      // In production, they would get copied to the `build` folder.
      // This loader doesn't use a "test" so it will catch all modules
      // that fall through the other loaders.
      {
        // Exclude `js` files to keep "css" loader working as it injects
        // its runtime that would otherwise be processed through "file" loader.
        // Exclude `ejs` since it is the template used by `html-webpack-plugin`
        // to generate the `html` files. Also exclude `html` and `json`
        // extensions so they get processed by webpack's internal loaders.
        exclude: [
          /\.(js|jsx)$/,
          /\.(ts|tsx)$/,
          /\.html$/,
          /\.json$/,
          /\.ejs$/,
        ],
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
    ],
  },
];
