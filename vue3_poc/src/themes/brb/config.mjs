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
			find: "styles/main.scss",
			replacement: "styles/main.scss",
		},
	],
};

export default config;
