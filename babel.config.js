module.exports = function(api) {
	api.cache(true);

	if (process.env.NODE_ENV === "test") {
		return {
			presets: ["@babel/preset-env"],
			plugins: [],
		};
	}

	return {
		presets: ["@nuxt/babel-preset-app"],
		plugins: [],
	};
};
