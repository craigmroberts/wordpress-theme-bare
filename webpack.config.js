var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/scripts/app.js',

  output:{
      filename: 'app.bundle.js',
      path: path.resolve(__dirname, 'dist/assets/scripts/')
  },
  devtool: 'source-map',
  devServer:{
    contentBase: 'dist',
    compress: true, // enable gzip compression
  },
  module: {
    rules: [{
      exclude: path.resolve(__dirname,'node_modules'),
      loader: 'babel-loader'
    }]
  }
}
