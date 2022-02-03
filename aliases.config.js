const path = require("path");
const fs = require("fs");
const prettier = require("prettier");
const themeName = process.env.SC_THEME || "default";

const variation = require("./variation")(themeName);

const aliases = {
	...variation,
	"@": "src",
	"@@": ".",
	"@locale": "locale",
	"@assets": "src/assets",
	"@components": "src/components",
	"@basecomponents": "src/components/base",
	"@docs": "docs",
	"@layouts": "src/layouts",
	"@middleware": "src/middleware",
	"@mixins": "src/mixins",
	"@pages": "src/pages",
	"@utils": "src/utils",
	"@plugins": "src/plugins",
	"@serverMiddleware": "src/serverMiddleware",
	"@store": "src/store",
	"@static": `src/themes/${themeName}/static`,
	"@theme": `src/themes/${themeName}`,
	"@styles": `src/themes/${themeName}/styles/index.scss`,
	"@styles-base": `src/themes/base/styles`,
	"@variables": `src/themes/${themeName}/styles/variables.scss`,
};

module.exports = {
	webpack: {},
	jest: {},
	jsconfig: {},
};

for (const alias in aliases) {
	const aliasTo = aliases[alias];
	module.exports.webpack[alias] = resolveSrc(aliasTo);
	const aliasHasExtension = /\.\w+$/.test(aliasTo);
	module.exports.jest[`^${alias}$`] = aliasHasExtension
		? `<rootDir>/${aliasTo}`
		: `<rootDir>/${aliasTo}/index.js`;
	module.exports.jest[`^${alias}/(.*)$`] = `<rootDir>/${aliasTo}/$1`;
	module.exports.jsconfig[alias + "/*"] = [aliasTo + "/*"];
	module.exports.jsconfig[alias] = aliasTo.includes("/index.")
		? [aliasTo]
		: [
				aliasTo + "/index.js",
				aliasTo + "/index.json",
				aliasTo + "/index.vue",
				aliasTo + "/index.scss",
				aliasTo + "/index.css",
		  ];
}

createConfigFile("./jsconfig.template", "jsconfig.json");
createConfigFile("./tsconfig.template", "tsconfig.json");

function createConfigFile(templateFilePath, configFilePath) {
	const template = require(templateFilePath) || {};
	const filePath = resolveSrc(configFilePath);
	fs.writeFile(
		filePath,
		prettier.format(
			JSON.stringify({
				...template,
				compilerOptions: {
					...(template.compilerOptions || {}),
					paths: module.exports.jsconfig,
				},
			}),
			{
				...require("./.prettierrc"),
				parser: "json",
			}
		),
		(error) => {
			if (error) {
				console.error(
					`Error while creating ${configFilePath} from aliases.config.js.`
				);
				throw error;
			}
		}
	);
}

function resolveSrc(_path) {
	return path.resolve(__dirname, _path);
}
