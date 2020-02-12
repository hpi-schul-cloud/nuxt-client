module.exports = function(api) {
	if (api && api.cache) {
		api.cache(true);
	}
	const commonPlugins = [
		"dynamic-import-node",
		"@babel/plugin-proposal-optional-chaining",
	];
	if (process.env.NODE_ENV === "test") {
		return {
			presets: [
				[
					"@babel/preset-env",
					{
						targets: {
							node: "current",
						},
					},
				],
			],
			plugins: [...commonPlugins],
		};
	}

	return {
		presets: ["@nuxt/babel-preset-app"],
		plugins: [...commonPlugins],
	};
};
