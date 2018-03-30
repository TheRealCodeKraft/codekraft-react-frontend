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
        loader: ['react-hot', 'babel-loader'],
      	include: path.join(__dirname, 'src')
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
