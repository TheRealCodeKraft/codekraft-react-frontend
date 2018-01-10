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
        test: /\.(js|css)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader', 'css',
        ],
      },
    ]
  },

  devServer: {
    contentBase: './example',
    host: 'localhost',
    inline: true,
    info: false
  }
};
