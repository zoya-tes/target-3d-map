const merge = require("webpack-merge");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safeParser = require("postcss-safe-parser");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { resolve } = require("path");
const baseConfig = require("./webpack.base");
const nodeExternals = require("webpack-node-externals");

module.exports = merge(baseConfig, {
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "./dist"),
    filename: "index.js",
    libraryTarget: "umd",
    library: "target-3d-map",
  },
  mode: "production",
  devtool: "source-map",

  module: {
    rules: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /(\.js(x?))$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          // Use the chain sass-loader -> css-loader -> style-loader
          // But use MiniCssExtractPlugin on prod, so we get a file.
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      }
    ],
  },

  externals: [nodeExternals()],
});
