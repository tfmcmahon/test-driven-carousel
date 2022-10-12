module.exports = {
  mode: 'development',
  entry: {
    carousel: './src/carousel.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
      },
    ],
  },
};
