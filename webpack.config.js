const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'public/'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: 'public/',
    port: 8080,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new htmlPlugin({
      template: 'src/index.html'
    }),
    new workboxPlugin({
      globDirectory: 'public',
      globPatterns: ['**/*.{html,js}'],
      globIgnores: [
        "node_modules/**/*",
        "workbox-sw.prod.v2.1.2.js",
        "sw.js"
      ],
      swDest: path.join('public', 'sw.js'),
      clientsClaim: true,
      skipWaiting: true,
    })
  ]
};
