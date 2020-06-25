const nuxtConfig = require("../../../nuxt.config.js");
const { additionalSecurityHeader } = require("../../../http-headers.config.js");

if (!nuxtConfig.csp.security_headers) {
	throw new Error("security_headers is missing in configuration (csp)");
}

if (!nuxtConfig.csp.security_headers.enabled) {
	console.log(
		"security_headers env has not been defined, to enable" +
			" security header set value to 1 and update in config.csp.security_headers"
	);
}

export default async function (req, res, next) {
	if (nuxtConfig.csp.security_headers.enabled) {
		Object.keys(additionalSecurityHeader).forEach((header) => {
			res.setHeader(header, additionalSecurityHeader[header]);
		});
	}
	return next();
}
