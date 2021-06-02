const micromatch = require("micromatch");

module.exports = {
	"*.js": ["npm run lint:eslint --fix", "npm run lint:prettier --write"],
	"{!(package)*.json}": ["npm run lint:prettier --parser json"],
	"package.json": ["npm run lint:prettier --write"],
	"*.vue": [
		"npm run lint:eslint --fix",
		"npm run lint:stylelint --fix",
		"npm run lint:prettier --write",
	],
	"*.scss": ["npm run lint:stylelint --fix", "npm run lint:prettier --write"],
	"*.md": ["npm run lint:markdownlint", "npm run lint:prettier --write"],
	"*.{png,jpeg,jpg,gif,svg}": (files) => {
		const match = micromatch.not(files, "**/__image_snapshots__/**");
		return ["imagemin-lint-staged"].map((e) => `${e} ${match.join(" ")}`);
	},
};
