const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = ["home", "signin", "signup", "show"];

module.exports = {
  entry: pages.reduce((entries, page) => {
    entries[page] = `./client/src/js/${page}.js`;
    return entries;
  }, {}),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'client', 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `./client/src/templates/${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
        })
    ),
  ],
  devServer: {
    static: path.resolve(__dirname, "client", "dist"),
    port: 3000,
    open: true, 
    hot: true,
    historyApiFallback: {
      index: '/home.html', 
      rewrites: [
        { from: /^\/signin$/, to: '/signin.html' },
        { from: /^\/signup$/, to: '/signup.html' },
        { from: /^\/show$/, to: '/show.html' },
      ],
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all', 
      name: 'vendor',
    },
    runtimeChunk: 'single', 
  },
  mode: 'development',
};
