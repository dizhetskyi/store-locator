var webpack = require('webpack');
var path = require('path');

module.exports = {
  
  devtool: 'sourcemap',

  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.scss$/, loader: 'style!css!sass'},
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]

}