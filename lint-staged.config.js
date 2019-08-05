module.exports = {
	"*.js": [
		"npm run lint:eslint --fix",
		"npm run lint:prettier --write",
		"git add",
		"npm run test:unit:file",
	],
	"{!(package)*.json,*.code-snippets,.*rc}": [
		"npm run lint:prettier --parser json",
		"git add",
	],
	"package.json": ["npm run lint:prettier --write", "git add"],
	"*.vue": [
		"npm run lint:eslint --fix",
		"npm run lint:stylelint --fix",
		"npm run lint:prettier --write",
		"git add",
		"npm run test:unit:file",
	],
	"*.scss": [
		"npm run lint:stylelint --fix",
		"npm run lint:prettier --write",
		"git add",
	],
	"*.md": [
		"npm run lint:markdownlint",
		"npm run lint:prettier --write",
		"git add",
	],
	"*.{png,jpeg,jpg,gif,svg}": ["imagemin-lint-staged", "git add"],
};
