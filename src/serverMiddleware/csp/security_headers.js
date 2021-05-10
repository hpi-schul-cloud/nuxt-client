const { additionalSecurityHeader } = require("../../../http-headers.config.js");

const SECURITY_HEADERS_ENABLED =
	process.env.SECURITY_HEADERS_ENABLED === "true";

if (!SECURITY_HEADERS_ENABLED) {
	console.log(
		"security_headers env has not been defined, to enable" +
			" security header set value to 1 and update in config.csp.security_headers"
	);
}

export default async function (req, res, next) {
	if (SECURITY_HEADERS_ENABLED) {
		Object.keys(additionalSecurityHeader).forEach((header) => {
			res.setHeader(header, additionalSecurityHeader[header]);
		});
	}
	return next();
}
