module.exports = [
  {
    test: /\.css$/,
    use: [
      { loader: "style-loader" },
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  {
    test: /\.scss$/,
    use: [
      { loader: "style-loader" },
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          importLoaders: 1,
        },
      },
      { loader: "sass-loader", options: { sourceMap: true } },
    ],
  },
];
