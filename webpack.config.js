module.exports = {

	entry: './public/app.js',

	output: {
		path: './dist',
		filename: 'bundle.js'
	},

	devtool: 'sourcemap',

	module: {
		loaders: [
			{test: /\.js$/, loader: 'babel', exclude: /node_modules/},
			{test: /\.scss$/, loader: 'style!css!sass'},
		]
	}

}