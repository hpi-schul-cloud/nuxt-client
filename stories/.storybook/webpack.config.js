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
		{
			enforce: "pre",
			test: /\.(js|vue)$/,
			loader: "eslint-loader",
			exclude: /(node_modules)/,
			options: {
				fix: true,
			},
		},
	];

	/*
	const svgRule = config.module.rules.find((rule) => rule.test.test(".svg"));
	svgRule.test = /\.(png|jpe?g|gif|webp)$/;

	config.module.rules.push({
		test: /\.svg$/,
		loader: "svg-inline-loader",
	});
	*/

	const alias = require("../../aliases.config").webpack;

	config.module.rules.push(...rules);
	Object.assign(config.resolve.alias, alias);

	return config;
};
