const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    carousel: './src/Carousel.js',
    example: './example/index.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Carousel Example',
      chunks: ['example'],
    }),
  ],
};
