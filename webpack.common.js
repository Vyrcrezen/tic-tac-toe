const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

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
          { from: './src/features/localization/lang', to: 'lang/' }
      ]
  }),
    new HtmlWebpackPlugin({
      title: "Melody Bits",
      injext: true,
      minify: true,
      filename: "Router.html",
      chunks: ["router"],
      publicPath: "/"
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
