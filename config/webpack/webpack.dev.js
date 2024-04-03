const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { createDevServerConfig } = require("./dev-server-config");
const { DefinePlugin } = require("webpack");

//Configure dev enviroment by combining common configuration and adding some more options
module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	plugins: [
		new DefinePlugin({
			"process.env": {
				NODE_ENV: '"development"',
			},
		}),
	],
	devServer:
		process.env.NODE_ENV === "development" ? createDevServerConfig() : {},
});
