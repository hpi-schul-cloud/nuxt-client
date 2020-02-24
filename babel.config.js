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
						useBuiltIns: "usage",
						corejs: { version: 3 },
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
		presets: [
			[
				"@nuxt/babel-preset-app",
				{
					useBuiltIns: "usage",
					corejs: { version: 3 },
				},
			],
		],
		plugins: [...commonPlugins],
	};
};
