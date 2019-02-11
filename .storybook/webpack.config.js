// filename = webpack.config.js
const path = require("path");

module.exports = {
	module: {
		rules: [
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"],
				include: path.resolve(__dirname, "../"),
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.svg$/,
				loader: "vue-svg-loader",
			},
		],
	},
	resolve: {
		alias: require("../aliases.config").webpack,
	},
};
