// This is inspired by the excellent article on Content Security Policy by Quest Henkart
// https://towardsdatascience.com/content-security-policy-how-to-create-an-iron-clad-nonce-based-csp3-policy-with-webpack-and-nginx-ce5a4605db90

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
