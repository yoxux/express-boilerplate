const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dirApp = path.join(__dirname, "app");
const dirStyles = path.join(__dirname, "styles");
const dirAssets = path.join(__dirname, "assets");
const dirNode = "node_modules";

module.exports = {
  entry: [path.join(dirApp, "index.js"), path.join(dirStyles, "index.scss")],

  resolve: {
    modules: [dirApp, dirStyles, dirAssets, dirNode],
  },

  output: {
    path: path.resolve(__dirname, "public"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
        loader: "file-loader",
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "" },
        { from: "fonts", to: "" },
      ],
    }),
  ],
};
