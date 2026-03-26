import { AliasConfig } from "./theme-aliases";
import { Plugin } from "vite";

const ThemeResolver = (replacements: AliasConfig[]): Plugin => ({
	name: "theme-resolver",
	enforce: "pre",
	async resolveId(source, importer, options) {
		const resolved = await this.resolve(source, importer, {
			...options,
			skipSelf: true,
		});

		const foundReplace = replacements.find((replacement) => (resolved ? replacement.find === resolved.id : undefined));

		if (foundReplace) {
			// eslint-disable-next-line no-console
			console.info(`replace "${foundReplace.find}" with "${foundReplace.replacement}"`);

			return {
				id: foundReplace.replacement,
			};
		}

		return null;
	},
});

export { ThemeResolver };
