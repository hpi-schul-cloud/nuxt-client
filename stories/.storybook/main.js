const path = require("path");
module.exports = {
	addons: [
		"@storybook/addon-notes/register",
		"@storybook/addon-viewport/register",
		"@storybook/addon-knobs/register",
		"@storybook/addon-actions/register",
		"@storybook/addon-a11y/register",
		"@storybook/addon-storysource/register",
		"@storybook/addon-docs",
	],
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.ts$/,
			exclude: /node_modules/,
			use: [
				{
					loader: "ts-loader",
					options: {
						appendTsSuffixTo: [/\.vue$/],
						transpileOnly: true,
					},
				},
			],
		});
		config.resolve.extensions.push(".ts");
		return config;
	},
};
