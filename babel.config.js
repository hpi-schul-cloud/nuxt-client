module.exports = function (api) {
	if (api && api.cache) {
		api.cache(true);
	}
	const commonPlugins = [
		"dynamic-import-node",
		"@babel/plugin-proposal-optional-chaining",
		"@babel/plugin-proposal-class-properties",
		"@babel/plugin-proposal-private-methods",
		"@babel/plugin-proposal-private-property-in-object",
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
