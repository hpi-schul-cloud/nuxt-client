const crypto = require("crypto");

export default async function (req, res, next) {
	const nonceValue = crypto.randomBytes(16).toString("base64");
	res.locals.nonceValue = nonceValue;
	next();
}
