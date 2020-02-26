const git = require("git-rev-sync");
const pkg = require("../../package");

const GIT_INFO = {
	sha: git.long(),
	version: pkg.version,
	branch: git.branch(),
	message: git.message(),
	commitDate: git.date(), // deprecated, replaced with birthtime
	birthtime: git.date(),
};

// overwrite info with versionfile if provided
try {
	const versionFile = require("../../version");
	Object.assign(GIT_INFO, versionFile);
} catch (error) {
	if (process.env.NODE_ENV === "production") {
		console.warn("version file is missing\n", error);
	}
}

export default async function(req, res, next) {
	if (req.url === "/nuxtversion") {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Content-Type", "application/json; charset=utf-8");
		res.write(JSON.stringify(GIT_INFO, null, "\t"));
		res.end();
	} else {
		next();
	}
}
