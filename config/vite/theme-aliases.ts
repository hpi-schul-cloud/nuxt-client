import path from "node:path";
import fs from "node:fs";

const getThemeConfig = async (themePath: string) => {
	const replacements = (await import(`${themePath}/alias.config.mjs`)).default;

	return replacements;
};

const getAvailableThemes = (dirname: string) => {
	const themeRootPath = path.resolve(dirname, "./src/themes");
	const themeNames = fs
		.readdirSync(themeRootPath, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
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
	const aliases = Array<AliasConfig>();
	const usedTheme = process.env.SC_THEME;

	if (usedTheme && isThemeAvailable(dirname, usedTheme)) {
		const themePath = `./src/themes/${usedTheme}`;
		const { replacements } = await getThemeConfig(
			path.resolve(dirname, themePath)
		);

		replacements.forEach((alias: AliasConfig) => {
			if (typeof alias === "string") {
				aliases.push({
					find: path.resolve(dirname, `src/${alias}`),
					replacement: path.resolve(dirname, `${themePath}/${alias}`),
				});
			}

			if (
				typeof alias === "object" &&
				typeof alias.find === "string" &&
				typeof alias.replacement === "string"
			) {
				aliases.push({
					find: path.resolve(dirname, `src/${alias.find}`),
					replacement: path.resolve(
						dirname,
						`${themePath}/${alias.replacement}`
					),
				});
			}
		});
	}

	return aliases;
};

export { generateAliases, AliasConfig };
