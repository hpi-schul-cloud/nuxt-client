import getThemeConfig from "./getThemeConfig";
import path from "path";

/**
 *
 * @returns {Promise<{find: string, replacement: string}[]>}
 */
export default async function generateAliases(dirname) {
	const aliases = [];
	const usedTheme = process.env.SC_THEME;

	if (usedTheme) {
		const themePath = `./src/themes/${usedTheme}`;
		const { replacements } = (await getThemeConfig(usedTheme)).default;

		replacements.forEach((replacement) => {
			if (typeof replacement === "string") {
				aliases.push({
					find: path.resolve(dirname, `src/${replacement}`),
					replacement: path.resolve(dirname, `${themePath}/${replacement}`),
				});
			}

			if (
				typeof replacement === "object" &&
				typeof replacement.find === "string" &&
				typeof replacement.replacement === "string"
			) {
				aliases.push({
					find: path.resolve(dirname, `src/${replacement.find}`),
					replacement: path.resolve(
						dirname,
						`${themePath}/${replacement.replacement}`
					),
				});
			}
		});
	}

	return aliases;
}
