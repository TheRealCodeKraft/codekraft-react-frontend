var path = require('path');

module.exports = {
  entry: {
  },

  output: {
    path: '.',
    filename: '[name].js',
    publicPath: '/example/compiled/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },

  devServer: {
    contentBase: './example',
    host: 'localhost',
    inline: true,
    info: false
  }
};
