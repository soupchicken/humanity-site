const path = require('path')
const webpack = require('webpack')
const srcPath = path.resolve('src')

module.exports = {
  devtool: 'eval',

  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './src/index.js',
  ],
  output: {
    path: path.resolve('build'),
    filename: 'app.js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        enforce:'pre',
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      },
			{
				test: /\.png$/,
				loader: "url-loader?mimetype=image/png"
			},
			{
				test: /\.svg?$/,
				loader: 'svg-sprite!svgo',
				include: path.resolve('./images')
			},
			{
				test: /\.gif$/,
				loader: "url-loader?mimetype=image/gif"
			},
      {
        test: /\.css$/,
        loader: ['style-loader','css-loader']
      },
      {
        test: /\.scss$/,
        loader: ['style-loader','css-loader','sass-loader']
      },
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: srcPath
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.HotModuleReplacementPlugin()
  ]
}
