const path = require("path");
module.exports = {
	addons: [
		"@storybook/addon-notes/",
		"@storybook/addon-viewport/",
		"@storybook/addon-knobs/",
		"@storybook/addon-actions/",
		"@storybook/addon-a11y/",
		"@storybook/addon-storysource/",
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
