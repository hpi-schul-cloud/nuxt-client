const nuxtConfig = require("../../nuxt.config.js");
const { additionalSecurityHeader } = require("../../http-headers.js");

if (nuxtConfig.csp.security_headers !== true) {
	throw new Error("security_headers missing in configuration");
}

if (!nuxtConfig.csp.security_headers.default) {
	console.log(
		"security_headers env has not been defined, to enable" +
			" security header set value to 1 and update in config.csp.security_headers"
	);
}

export default async function (req, res, next) {
	if (nuxtConfig.csp.security_headers) {
		Object.keys(additionalSecurityHeader).forEach((header) => {
			res.setHeader(header, additionalSecurityHeader[header]);
		});
	}
	return next();
}
