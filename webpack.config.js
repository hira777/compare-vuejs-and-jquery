const path = require('path');

module.exports = {
  entry: {
    'vue-single-file-components/app':
      './src/js/vue-single-file-components/app.js',
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'docs'),
  },

  module: {
    rules: [
      {
        test: /\.vue/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
            scss: 'vue-style-loader!css-loader!sass-loader',
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  devtool: 'source-map',
};
