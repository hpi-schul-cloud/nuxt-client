const { generateJSON } = require("@intlify/bundle-utils");

const loader = function (source, sourceMap) {
	const loaderContext = this;
	const options = {
		filename: loaderContext.resourcePath,
		bridge: false,
		sourceMap: false,
		inSourceMap: sourceMap,
		forceStringify: false,
		useClassComponent: false,
		strictMessage: false,
		escapeHtml: false,
		env: loaderContext.mode,
		type: "plain",
		isGlobal: false,
		onWarn: (msg) => {
			console.warn(`[vue-i18n-loader]: ${loaderContext.resourcePath} ${msg}`);
			// loaderContext.emitWarning(
			// 	`[vue-i18n-loader]: ${loaderContext.resourcePath} ${msg}`
			// );
		},
		onError: (msg) => {
			console.error(`[vue-i18n-loader]: ${loaderContext.resourcePath} ${msg}`);
			// loaderContext.emitError(
			// 	`[vue-i18n-loader]: ${loaderContext.resourcePath} ${msg}`
			// );
		},
	};

	try {
		this.cacheable && this.cacheable();
		const { code, map } = generateJSON(source, options);
		this.callback(null, code, map);
	} catch (err) {
		console.error("error:", `[vue-i18n-loader]: ${err.message}`);
		// this.emitError(`[vue-i18n-loader]: ${err.message}`);
	}
};

module.exports = loader;
