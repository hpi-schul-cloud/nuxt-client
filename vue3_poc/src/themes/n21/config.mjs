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
			find: "vuetify-settings.scss",
			replacement: "styles/vuetify-settings.scss",
		},
		{
			find: "styles/custom-theme.ts",
			replacement: "styles/custom-theme.ts",
		},
	],
};

export default config;
