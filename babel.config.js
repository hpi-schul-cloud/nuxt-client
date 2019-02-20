module.exports = function(api) {
	api.cache(true);

	if (process.env.NODE_ENV === "test") {
		return {
			presets: ["@babel/preset-env"],
			plugins: ["@babel/plugin-syntax-dynamic-import"],
		};
	}

	return {
		presets: ["@nuxt/babel-preset-app"],
		plugins: [],
	};
};
