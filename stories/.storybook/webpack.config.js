// filename = webpack.config.js
const path = require("path");

module.exports = ({ config }) => {
	const rules = [
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
		{
			test: /\.(png|jpg|gif)$/,
			use: [
				{
					loader: "file-loader",
					options: {},
				},
			],
		},
	];
	const alias = require("../../aliases.config").webpack;

	config.module.rules = config.module.rules.concat(rules);
	Object.assign(config.resolve.alias, alias);

	console.log(config.module.rules);
	return config;
};
