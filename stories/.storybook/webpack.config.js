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
			loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
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
	config.module.rules.push(...rules);

	const alias = require("../../aliases.config").webpack;
	Object.assign(config.resolve.alias, alias);
	Object.assign(config.resolve.alias, {
		assets: path.resolve(__dirname, "../../src/assets"),
	});

	return config;
};
