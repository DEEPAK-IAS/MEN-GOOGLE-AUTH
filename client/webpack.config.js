const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = ["home", "signin", "signup", "show", "header.component"];

module.exports = {
  entry: pages.reduce((entries, page) => {
    entries[page] = `./src/js/${page}.js`;
    return entries;
  }, {}),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, 
        type: 'asset/resource',
      },
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
          template: `./src/templates/${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
        })
    ),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', 
      name: 'vendor',
    },
    runtimeChunk: 'single', 
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, "dist"),
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
  }
};
