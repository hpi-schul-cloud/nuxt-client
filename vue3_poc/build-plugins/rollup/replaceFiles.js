import path from "path";

/**
 * @function replaceFiles
 * @param {({find: string, replacement: string})[]} replacements
 * @return {({name: "rollup-plugin-replace-files", enforce: "pre", Promise<resolveId>})}
 */

export default function replaceFiles(replacements) {
	if (!replacements?.length) {
		return null;
	}

	// maybe we can also use this place to check the existence of replacemtents
	// (instead of in the buildStart() hook)

	return {
		name: "rollup-plugin-replace-files",
		enforce: "pre",
		async buildStart(options) {
			console.log("buildStart: ", options);
			// TODO check existence of replacemtents
		},
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
