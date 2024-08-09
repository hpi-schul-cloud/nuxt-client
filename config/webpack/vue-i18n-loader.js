const { generateJSON, generateJavaScript } = require("@intlify/bundle-utils");

const loader = function (source, sourceMap) {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
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
			loaderContext.emitWarning(
				new Error(`[vue-i18n-loader]: ${loaderContext.resourcePath} ${msg}`)
			);
		},
		onError: (msg) => {
			loaderContext.emitError(
				new Error(`[vue-i18n-loader]: ${loaderContext.resourcePath} ${msg}`)
			);
		},
	};

	try {
		this.cacheable && this.cacheable();
		const { code, map } = generateJavaScript(source, options);
		this.callback(null, code, map);
	} catch (err) {
		loaderContext.emitError(new Error(`[vue-i18n-loader]: ${err.message}`));
	}
};

module.exports = loader;
