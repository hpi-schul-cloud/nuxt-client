import path from "path";
import fs from "fs";
import { exit } from "process";

/**
 * @function replaceFiles
 * @param {({find: string, replacement: string})[]} replacements
 * @return {({name: "rollup-plugin-replace-files", enforce: "pre", Promise<resolveId>})}
 */

export default function replaceFiles(replacements) {
	if (!replacements?.length) {
		return null;
	}

	replacements.forEach((repl) => {
		const path = repl.replacement;
		if (!fs.existsSync(path)) {
			console.error("replacement file does not exist: ", path);
			exit(1);
		}
	});

	return {
		name: "rollup-plugin-replace-files",
		enforce: "pre",
		async resolveId(source, importer) {
			const resolved = await this.resolve(source, importer, { skipSelf: true });

			const foundReplace = replacements.find((replacement) => {
				if (resolved?.id === undefined) {
					return false;
				}
				return (
					path.normalize(resolved?.id) === path.normalize(replacement.find)
				);
			});

			if (foundReplace) {
				console.info(
					`replace "${foundReplace.find}" with "${foundReplace.replacement}"`
				);

				try {
					// return new file content
					return {
						id: foundReplace.replacement,
					};
				} catch (err) {
					console.error(err);

					return null;
				}
			}

			return null;
		},
	};
}
