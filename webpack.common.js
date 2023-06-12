const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require("path");
const { template } = require("lodash");

module.exports = {
  entry: {
    router: "./src/pages/Router.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
            mimetype: 'image/jpg',
            limit: 1 * 1024,
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
          { from: './src/features/server/server.js', to: './' }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: './src/features/localization/lang', to: 'lang/' }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: './tictactoe.webmanifest', to: './' }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: './src/global/media/images/icon.png', to: './' }
      ]
    }),
  new WorkboxPlugin.GenerateSW({
    swDest: 'service-worker.js',
    navigateFallback: 'router.html',
    clientsClaim: true,
    skipWaiting: true,
  }),
    new HtmlWebpackPlugin({
      title: "Tic-Tac-Toe",
      inject: true,
      minify: true,
      favicon: './src/global/media/images/favicon.ico',
      filename: "router.html",
      chunks: ["router"],
      publicPath: "./",
      template: './src/global/templates/rootTemplate.html',
      manifest: './tictactoe.webmanifest'
    }),
  ],
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer/"),
    }
  },
};
