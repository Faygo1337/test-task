module.exports = {
  // ...existing code...
  module: {
    plugins: [require("autoprefixer")],
    rules: [
      // ...existing rules...
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          "resolve-url-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
