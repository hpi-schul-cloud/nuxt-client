module.exports = function(api) {
	if (api && api.cache) {
		api.cache(true);
	}

	if (process.env.NODE_ENV === "test") {
		return {
			presets: ["@babel/preset-env"],
			plugins: ["dynamic-import-node"],
		};
	}

	return {
		presets: ["@nuxt/babel-preset-app"],
		plugins: ["dynamic-import-node"],
	};
};
