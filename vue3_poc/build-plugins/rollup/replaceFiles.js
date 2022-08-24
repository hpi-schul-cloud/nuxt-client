/**
 * @function replaceFiles
 * @param {({find: string, replacement: string})[]} replacements
 * @return {({name: "rollup-plugin-replace-files", enforce: "pre", Promise<resolveId>})}
 */
export default function replaceFiles(replacements) {
	if (!replacements?.length) {
		return null;
	}

	return {
		name: "rollup-plugin-replace-files",
		enforce: "pre",
		async resolveId(source, importer) {
			const resolved = await this.resolve(source, importer, { skipSelf: true });

			const foundReplace = replacements.find(
				(replacement) => resolved?.id === replacement.find
			);

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
