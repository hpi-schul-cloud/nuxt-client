const git = require("git-rev-sync");
const pkg = require("../../package");

const GIT_INFO = {
	sha: git.long(),
	version: pkg.version,
	branch: git.branch(),
	message: git.message(),
	commitDate: git.date(),
};

export default async function(req, res, next) {
	if (req.url === "/nuxtversion") {
		res.setHeader("Content-Type", "application/json; charset=utf-8");
		res.write(JSON.stringify(GIT_INFO, null, "\t"));
		res.end();
	} else {
		next();
	}
}
