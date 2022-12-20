const HtmlWebpackPlugin = require("html-webpack-plugin");
class NoncePlaceholderPlugin {
	apply(compiler) {
		compiler.hooks.thisCompilation.tap(
			"NoncePlaceholderPlugin",
			(compilation) => {
				HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
					"NoncePlaceholderPlugin",
					(data, cb) => {
						const { headTags } = data;
						headTags.forEach((x) => {
							x.attributes.nonce = "**CSP_NONCE**";
						});
						cb(null, data);
					}
				);
			}
		);
	}
}

module.exports = NoncePlaceholderPlugin;
