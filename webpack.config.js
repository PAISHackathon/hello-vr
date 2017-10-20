"use strict";
const path = require("path"),
  webpack = require("webpack"),
  BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin,
  HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/main.js",
    hal: "./src/components/vue/hal/test.js",
    'item-view': "./src/components/vue/item-view/test.js",
    browser: "./src/components/vue/browser/test.js",
    'aframe-half-pipe': "./src/components/aframe/half-pipe/test.js",
    'aframe-dpad': "./src/components/aframe/dpad/test.js",
    vendor: ["aframe", "vue"]
  },
  output: {
    path: __dirname,
    filename: "dist/[name]/bundle.js", // for production, use [hash]
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    public: "hello-vue.lvh.me:8080"
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "dist/vendor/bundle.js"
    }),
    new HtmlWebpackPlugin({
      inject: "head",
      chunks: ["main", "vendor"],
      filename: path.resolve(__dirname, "./dist/main/index.html"),
      template: path.resolve(__dirname, "./src/assets/index.html")
    }),
    new HtmlWebpackPlugin({
      inject: "head",
      chunks: ["hal", "vendor"],
      filename: path.resolve(__dirname, "./dist/hal/index.html"),
      template: path.resolve(__dirname, "./src/assets/index.html")
    }),
    new HtmlWebpackPlugin({
      inject: "head",
      chunks: ["aframe-half-pipe", "vendor"],
      filename: path.resolve(__dirname, "./dist/aframe-half-pipe/index.html"),
      template: path.resolve(__dirname, "./src/assets/aframe.html")
    }),
    new HtmlWebpackPlugin({
      inject: "head",
      chunks: ["aframe-dpad", "vendor"],
      filename: path.resolve(__dirname, "./dist/aframe-dpad/index.html"),
      template: path.resolve(__dirname, "./src/assets/aframe.html")
    }),
    new HtmlWebpackPlugin({
      inject: "head",
      chunks: ["browser", "vendor"],
      filename: path.resolve(__dirname, "./dist/browser/index.html"),
      template: path.resolve(__dirname, "./src/assets/index.html")
    }),
    new HtmlWebpackPlugin({
      inject: "head",
      chunks: ["item-view", "vendor"],
      filename: path.resolve(__dirname, "./dist/item-view/index.html"),
      template: path.resolve(__dirname, "./src/assets/index.html")
    }),
  ],
  devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    /*new BundleAnalyzerPlugin({
      analyzerMode: "static", //server
      // Host that will be used in `server` mode to start HTTP server.
      analyzerHost: "127.0.0.1",
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 8888
    })*/
  ]);
}
