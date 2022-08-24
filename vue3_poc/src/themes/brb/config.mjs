const config = {
	replacements: [
		/**
		 * for replacing files we have two options. Either as simple string, which mirrows the cores file structure, or as find and replacement object.
		 */
		{
			find: "App.vue",
			replacement: "App.vue",
		},
		"App.vue",
	],
	defines: {
		/**
		 * you can use your .env file as well with "VITE_CUSTOM_VAR=value"
		 * reference these values with "import.meta.env.VITE_CUSTOM_VAR".
		 * These values will be visible in your production code.
		 * Defines are essentially the same.
		 */
		"defines.env.CUSTOM": JSON.stringify("my custom global constant"),
	},
};

export default config;
