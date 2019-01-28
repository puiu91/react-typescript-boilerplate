const autoprefixer = require("autoprefixer");
const extractCss = require("../../plugins/extractCss");

module.exports = [
  {
    test: /\.css$/,
    use: extractCss.extract({
      fallback: "style-loader",
      use: [
        {
          loader: "css-loader",
          options: {
            minimize: true,
            importLoaders: 1,
          },
        },
        {
          loader: "postcss-loader",
          options: {
            plugins: () => [autoprefixer],
          },
        },
      ],
    }),
  },
  {
    test: /\.scss$/,
    use: extractCss.extract({
      fallback: "style-loader",
      use: [
        {
          loader: "css-loader",
          options: {
            minimize: true,
            importLoaders: 2,
          },
        },
        {
          loader: "postcss-loader",
          options: {
            plugins: () => [autoprefixer],
          },
        },
        { loader: "sass-loader" },
      ],
    }),
  },
];
