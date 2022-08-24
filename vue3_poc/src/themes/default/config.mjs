const config = {
	replacements: [],
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
