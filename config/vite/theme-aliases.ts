/* eslint-disable no-console */

import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "url";

const getThemeConfig = async (themePath: string) =>
	(await import(pathToFileURL(themePath).href)).default;

const getAvailableThemes = (dirname: string) =>
	fs
		.readdirSync(path.join(dirname, "./src/themes"), { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

const isThemeAvailable = (dirname: string, themeName: string) =>
	getAvailableThemes(dirname).includes(themeName);

type AliasConfig = {
	find: string;
	replacement: string;
};

const generateAliases = async (dirname: string) => {
	const aliases = Array<AliasConfig>();
	const usedTheme = process.env.SC_THEME;
	console.log(`🎨 Attempting to load school theme ...`);

	if (usedTheme && isThemeAvailable(dirname, usedTheme)) {
		console.log(`🔄 Loading theme ${usedTheme} ...`);

		const themePath = `./src/themes/${usedTheme}`;

		const { replacements } = await getThemeConfig(
			path.join(dirname, themePath, "alias.config.mjs")
		);

		replacements.forEach((alias: AliasConfig) => {
			if (typeof alias === "string") {
				aliases.push({
					find: path.join(dirname, `src/${alias}`),
					replacement: path.join(dirname, `${themePath}/${alias}`),
				});
			}

			if (
				typeof alias === "object" &&
				typeof alias.find === "string" &&
				typeof alias.replacement === "string"
			) {
				aliases.push({
					find: path.join(dirname, `src/${alias.find}`),
					replacement: path.join(dirname, `${themePath}/${alias.replacement}`),
				});
			}
		});

		console.log(`✨  Theme ${usedTheme} loaded successfully!`);
	} else {
		console.log(`✨  The default theme is in use.`);
	}

	return aliases;
};

export { generateAliases, AliasConfig };
