/* eslint-disable no-console */
import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

const getThemeConfig = async (dirname: string, themePath: string) => {
	const configPath = path.resolve(dirname, themePath, "alias.config.mjs");
	const configPathAsUrl = pathToFileURL(configPath).href;
	console.log(`Loading theme config from: ${configPath}`);

	const config = (await import(configPathAsUrl)).default;
	const { replacements } = config;

	return replacements;
};

const getAvailableThemes = (dirname: string) => {
	const themeRootPath = path.resolve(dirname, "src", "themes");
	console.log(`Reading themes from: ${themeRootPath}`);

	const themeNames = fs
		.readdirSync(themeRootPath, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	console.log(`Available themes: ${themeNames.join(", ")}`);

	return themeNames;
};

const isThemeAvailable = (dirname: string, themeName: string) => {
	return getAvailableThemes(dirname).includes(themeName);
};

type AliasConfig = {
	find: string;
	replacement: string;
};

const generateAliases = async (dirname: string) => {
	console.log(`> generateAliases called with dirname: ${dirname}`);
	const aliases = Array<AliasConfig>();
	const usedTheme = process.env.SC_THEME;

	if (usedTheme && isThemeAvailable(dirname, usedTheme)) {
		const themePath = path.resolve("src", "themes", usedTheme);
		console.log(`Using theme: ${usedTheme}`);
		const replacements = await getThemeConfig(dirname, themePath);

		replacements.forEach((alias: AliasConfig) => {
			// console.log(`Processing alias: ${JSON.stringify(alias)}`);
			if (typeof alias === "string") {
				aliases.push({
					find: path.resolve(dirname, `src/${alias}`),
					replacement: path.resolve(dirname, themePath, alias),
				});
			}

			if (
				typeof alias === "object" &&
				typeof alias.find === "string" &&
				typeof alias.replacement === "string"
			) {
				aliases.push({
					find: path.resolve(dirname, "src", alias.find),
					replacement: path.resolve(dirname, themePath, alias.replacement),
				});
			}
		});
	} else {
		console.log("No valid theme found.");
	}

	// console.log("Generated aliases:", aliases);

	return aliases;
};

export { generateAliases, AliasConfig };
