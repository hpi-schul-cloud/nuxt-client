const path = require("path");
const fs = require("fs");

const getThemeConfig = (themePath) => {
	return require(`${themePath}/alias.config.js`);
};

const getAvailableThemes = (dirname) => {
	const themeRootPath = path.resolve(dirname, "./src/themes");
	const themeNames = fs
		.readdirSync(themeRootPath, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
	return themeNames;
};

const isThemeAvailable = (dirname, themeName) => {
	return getAvailableThemes(dirname).includes(themeName);
};

const generateAliases = (dirname) => {
	const aliases = [];
	const usedTheme = process.env.SC_THEME;

	if (usedTheme && isThemeAvailable(dirname, usedTheme)) {
		const themePath = `./src/themes/${usedTheme}`;
		const { replacements } = getThemeConfig(path.resolve(dirname, themePath));

		replacements.forEach((replacement) => {
			if (typeof replacement === "string") {
				if (!replacement.startsWith("@/")) {
					console.error(`Replacement of ${replacement} not supported.`);
				}

				aliases.push({
					find: replacement,
					replacement: replacement.replace("@/", `@/themes/${usedTheme}/`),
				});
			}
		});
	}

	return aliases;
};

module.exports = generateAliases;
