import getThemeConfig from "./getThemeConfig";
import path from "path";
import getTheme from "./getTheme";

/**
 *
 * @returns {Promise<{find: string, replacement: string}[]>}
 */
export default async function generateAliases(dirname) {
	const usedTheme = getTheme();
	const themePath = `./src/themes/${usedTheme}`;

	const { replacements } = (await getThemeConfig()).default;
	const aliases = [];

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

	return aliases;
}
