import { randomBytes } from "crypto";
const {
	contentSecurityPolicy,
	accessControlAllowOrigin,
} = require("../../../http-headers.config.js");

const CORS_ENABLED = process.env.CORS_ENABLED === "true";

if (!CORS_ENABLED) {
	console.log(
		"cors env has not been defined, to enable route specific cors" +
			" header set value to 1 and update values in config.csp.cors"
	);
}

const replaceNonceAttribute = (nonceValueField, nonceValue) => {
	let nonceValueFieldString = nonceValueField;
	if (
		nonceValueFieldString &&
		nonceValueFieldString.includes("nonce-<nonceValue>")
	) {
		nonceValueFieldString = nonceValueFieldString.replace(
			/<nonceValue>/g,
			nonceValue
		);
	}
	return nonceValueFieldString;
};

const addMatchHeaders = (defvalue, addvalue) => {
	let headerString = defvalue;
	if (addvalue && addvalue.includes("*")) {
		headerString = `${addvalue}`;
	} else if (addvalue) {
		headerString = `${headerString} ${addvalue}`;
	}
	return headerString;
};

const cspHeadersForRoute = (path, regexs, corsDefault, nonceValue) => {
	const attributes = {
		defaultSrc: `${corsDefault.defaultSrc}`,
		scriptSrc: `${corsDefault.scriptSrc}`,
		styleSrc: `${corsDefault.styleSrc}`,
		imageSrc: `${corsDefault.imageSrc}`,
		fontSrc: `${corsDefault.fontSrc}`,
		connectSrc: `${corsDefault.connectSrc}`,
		mediaSrc: `${corsDefault.mediaSrc}`,
		objectSrc: `${corsDefault.objectSrc}`,
		prefetchSrc: `${corsDefault.prefetchSrc}`,
		childSrc: `${corsDefault.childSrc}`,
		frameSrc: `${corsDefault.frameSrc}`,
		workerSrc: `${corsDefault.workerSrc}`,
		frameancestorsSrc: `${corsDefault.frameancestorsSrc}`,
		formactionSrc: `${corsDefault.formactionSrc}`,
		upgradeInsecureRequestsSrc: `${corsDefault.upgradeInsecureRequestsSrc}`,
		blockAllMixedContentSrc: `${corsDefault.blockAllMixedContentSrc}`,
		sandboxSrc: `${corsDefault.sandboxSrc}`,
		baseuriSrc: `${corsDefault.baseuriSrc}`,
		manifestSrc: `${corsDefault.manifestSrc}`,
	};

	const matchingKeys = Object.keys(regexs).filter((key) => path.match(key));
	const corsHeaders = matchingKeys.map((key) => regexs[key]);

	corsHeaders.forEach((matchingHeader) => {
		for (const headerAttribute in attributes) {
			if (Object.prototype.hasOwnProperty.call(attributes, headerAttribute)) {
				attributes[headerAttribute] = addMatchHeaders(
					attributes[headerAttribute],
					matchingHeader[headerAttribute]
				);
			}
		}
	});

	for (const NonceAttribute in attributes) {
		if (Object.prototype.hasOwnProperty.call(attributes, NonceAttribute)) {
			attributes[NonceAttribute] = replaceNonceAttribute(
				attributes[NonceAttribute],
				nonceValue
			);
		}
	}

	console.log(`cors headers for route ${path}`, corsHeaders);
	return attributes;
};

const accessControlHeadersForRoute = (path, regexs) => {
	const matchingKeys = Object.keys(regexs).filter((key) => path.match(key));
	const corsHeaders = matchingKeys.map((key) => regexs[key]);
	console.log(`cors headers for route ${path}`, corsHeaders);
	return corsHeaders;
};

const getNonceValue = () => {
	const nonceValue = randomBytes(16).toString("base64");
	return nonceValue;
};

export default async function (req, res, next) {
	if (CORS_ENABLED) {
		try {
			// Content-Security-Policy
			const { corsDefault, corsSiteSpecific } = contentSecurityPolicy;
			const corsAllowContentOrigins = cspHeadersForRoute(
				req.url,
				corsSiteSpecific,
				corsDefault,
				getNonceValue()
			);
			if (corsAllowContentOrigins) {
				let cspString = "";
				for (const cspAttribute in corsAllowContentOrigins) {
					if (
						Object.prototype.hasOwnProperty.call(
							corsAllowContentOrigins,
							cspAttribute
						)
					) {
						const cspKey = cspAttribute
							.replace(/([a-z])([A-Z])/g, "$1-$2")
							.replace(/\s+/g, "-")
							.toLowerCase();
						const cspValue = corsAllowContentOrigins[cspAttribute];
						if (cspValue !== "undefined") {
							if (
								cspAttribute === "upgradeInsecureRequestsSrc" ||
								cspAttribute === "blockAllMixedContentSrc"
							) {
								cspString += `${corsAllowContentOrigins[cspAttribute]}; `;
							} else {
								cspString += `${cspKey} ${corsAllowContentOrigins[cspAttribute]}; `;
							}
						}
					}
				}
				if (cspString) {
					res.setHeader("Content-Security-Policy", cspString);
				} else {
					console.log("Content-Security-Policy header string not found");
				}
			} else {
				console.log(
					"Content-Security-Policy header not set, because config does not contain valid content"
				);
			}

			// Access-Control-Allow-Origin
			const corsAllowOrigins = accessControlHeadersForRoute(
				req.url,
				accessControlAllowOrigin
			);
			if (corsAllowOrigins.length !== 0) {
				res.setHeader(
					"Access-Control-Allow-Origin",
					corsAllowOrigins.join(" | ")
				);
			} else {
				console.log(
					"do not set cors header, because config does not contain valid content"
				);
			}
		} catch (error) {
			console.log("error while setting cors header", error);
		}
	}
	return next();
}
