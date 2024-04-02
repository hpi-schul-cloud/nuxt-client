const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { createDevServerConfig } = require("./dev-server-config");

//Configure dev enviroment by combining common configuration and adding some more options
module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	devServer:
		process.env.NODE_ENV === "development" ? createDevServerConfig() : {},
	// devServer: {
	// 	static: "./dist",
	// 	open: true,
	// 	hot: true,
	// },
	// devServer: {
	// 	port: 4000,
	// },
});
