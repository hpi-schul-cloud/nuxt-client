const config = {
	replacements: [
		/**
		 * for replacing files we have two options. Either as simple string, which mirrors the cores file structure, or as find and replacement object.
		 */
		{
			find: "App.vue",
			replacement: "App.vue",
		},
		{
			find: "components/Impressum.vue",
			replacement: "ImpressumNew.vue",
		},
		{
			find: "styles/vuetify.scss",
			replacement: "styles/vuetify.scss",
		},
		{
			find: "styles/custom-theme.ts",
			replacement: "styles/custom-theme.ts",
		},
	],
};

export default config;

/**
 * Edge Cases:
 *  1. Found "find" but cannot find "replacement" -> ERROR
 *  2. "find" and "replacement" have different file-names -> ?
 *  3. "find" and "replacement" have different paths -> ?
 *  4. "find" is hit multiple times in different subtrees -> ?
 *  5. "find" cannot be found -> ERROR
 */
