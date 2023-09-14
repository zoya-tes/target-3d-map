const { resolve } = require("path");
// const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// const CopyWebpackPlugin = require("copy-webpack-plugin");
// const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-tags-plugin"); //used in conjunction with html-wbepack-plugin to inject custom tags/scripts into your html output
// const cesiumSource = require("cesium");
// const cesiumWorkers = "../Build/Cesium/Workers";
// if the size of resource is bigger than threshold,
// it will be splitted into additional file
// rather than bundle to javascript file
const resourceThreshold = 8192;

module.exports = {
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "./dist"),
    filename: "index.js",
  },

  module: {
    rules: [
      {
        test: /\.bpmn$/,
        use: "raw-loader",
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "@svgr/webpack",
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/i,
        exclude:
          /node_modules(?!(\/|\\)(@target-energysolutions|react-reflex|@jitsi(\/|\\)js-utils))/,
        loader: "babel-loader",
        options: {},
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg|pdf)$/i,
        loader: "url-loader",
        options: {
          limit: resourceThreshold,
          name: "images/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        loader: "url-loader",
        options: {
          limit: resourceThreshold,
          name: "media/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        loader: "url-loader",
        options: {
          limit: resourceThreshold,
          name: "fonts/[name].[hash:8].[ext]",
        },
      },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin(),
  //   new CopyWebpackPlugin({
  //     patterns: [
  //       {
  //         from: resolve(__dirname, './node_modules/cesium/Build/Cesium'),
  //         to: "cesium",
  //       },
  //     ],
  //   }),
  //   new HtmlWebpackIncludeAssetsPlugin({
  //     append: false,
  //     assets: ["cesium/Widgets/widgets.css", "cesium/Cesium.js"],
  //   }),
  //   new webpack.DefinePlugin({
  //     CESIUM_BASE_URL: JSON.stringify("/cesium"), // Adjust the path as needed
  //   }),
  // ],
  resolveLoader: {
    alias: {
      worker: "workerize-loader?name=js/[hash:8]",
    },
  },
  resolve: {
    symlinks: false,
    modules: [resolve(__dirname, "./src"), "node_modules"],
    extensions: [".mjs", ".js", ".jsx"],
    alias: {
      react: resolve(__dirname, "node_modules/react"),
      "react-dom": resolve(__dirname, "node_modules/react-dom"),
    },

    // alias: {
    //   cesium: resolve(__dirname, './node_modules/cesium/Build/Cesium'),
    // },
  },
};
