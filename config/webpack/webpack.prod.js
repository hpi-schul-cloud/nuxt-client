const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { DefinePlugin } = require("webpack");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

//Configure prod enviroment by using common configuration and adding some more options
module.exports = merge(common, {
	mode: "production",
	devtool: false,
	plugins: [
		new DefinePlugin({
			"process.env": {
				NODE_ENV: '"production"',
			},
		}),
		new ESLintWebpackPlugin({
			failOnError: true,
		}),
	],
	//we can add many of optimizations configurations as minification, compression and so on,
	//but to be a minumal project example so its needs to have only minimal configuration
});
