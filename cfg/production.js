const path = require('path');
const webpack = require('webpack');
const srcPath = path.resolve('src');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeExternals = require('webpack-node-externals');
module.exports = [
	{
		name:'app',
		devtool: 'nosources-source-map',
		entry: './src/index.js',
		output: {
			path: path.resolve('build'),
			filename: 'app.js',
			publicPath: 'build'
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					})
				},
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader','sass-loader']
					})
				},
				{
					test: /\.js$/,
					loader: 'babel-loader',
					include: srcPath
				},
				{
					test: /\.json$/,
					loader: 'json-loader'
				}
			]
		},
		plugins: [
			new ExtractTextPlugin("style.css"),
			new webpack.EnvironmentPlugin(['NODE_ENV']),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.AggressiveMergingPlugin()
		]
	},
	{
		name:'server',
		devtool: 'nosources-source-map',
		entry: './server.js',
		output: {
			path: path.resolve('build'),
			filename: 'server.js',
			publicPath: 'build'
		},
		target:'node',
		externals:[nodeExternals()],
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
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
			new webpack.optimize.AggressiveMergingPlugin()
		]
	}
]
