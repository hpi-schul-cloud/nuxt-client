// filename = webpack.config.js
const path = require("path");

module.exports = {
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "storybook-addon-vue-info/loader",
				enforce: "post",
			},
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"],
				include: path.resolve(__dirname, "../../"),
			},
			/* // we are not using it in our nuxt config, so why here.
			{
				test: /\.svg$/,
				loader: "vue-svg-loader",
			},
			*/
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {},
					},
				],
			},
		],
	},
	resolve: {
		alias: require("../../aliases.config").webpack,
	},
};
