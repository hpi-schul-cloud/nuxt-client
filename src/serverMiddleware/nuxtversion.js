const pkg = require("../../package");

const GIT_INFO = {
	version: pkg.version,
};

export default async function (req, res, next) {
	if (req.url === "/nuxtversion") {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Content-Type", "application/json; charset=utf-8");
		res.write(JSON.stringify(GIT_INFO, null, "\t"));
		res.end();
	} else {
		next();
	}
}
