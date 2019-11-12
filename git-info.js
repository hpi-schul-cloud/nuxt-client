const git = require("git-rev-sync");
const pkg = require("./package");

module.exports = {
	sha: git.long(),
	version: pkg.version,
	branch: git.branch(),
	message: git.message(),
	commitDate: git.date(),
};
