import { Plugin } from "vite";
import { AliasConfig } from "./theme-aliases";

const ThemeResolver = (replacements: AliasConfig[]): Plugin => {
	return {
		name: "theme-resolver",
		enforce: "pre",
		async resolveId(source, importer, options) {
			const resolved = await this.resolve(source, importer, {
				...options,
				skipSelf: true,
			});

			const foundReplace = replacements.find((replacement) => {
				return resolved ? replacement.find === resolved.id : undefined;
			});

			if (foundReplace) {
				// eslint-disable-next-line no-console
				console.info(
					`replace "${foundReplace.find}" with "${foundReplace.replacement}"`
				);

				return {
					id: foundReplace.replacement,
				};
			}

			return null;
		},
	};
};

export { ThemeResolver };
