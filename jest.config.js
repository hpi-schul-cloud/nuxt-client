// process.env.TZ = "Europe/Berlin";

module.exports = {
	// NUXT_REMOVAL we have to remove babel later.
	// we have to keep it for now as a migration path for compatibility with legacy js components / tests
	// dependencies that can be removed later after fully moving to typescript:
	// @vue/cli-plugin-babel, babel-jest
	// (do not forget to remove babel.config.js as well)
	preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
	testMatch: ["**/*.unit.{j,t}s?(x)"],

	moduleNameMapper: {
		"^axios$": require.resolve("axios"),
		"^@@/(.*)$": "<rootDir>/$1",
	},

	setupFiles: ["./tests/unit/setup.js"],

	collectCoverageFrom: [
		// Include
		"<rootDir>/src/components/**/*.{js,ts,vue}",
		"<rootDir>/src/pages/**/*.{js,vue}",
		"<rootDir>/src/mixins/**/*.js",
		"<rootDir>/src/plugins/**/*.(js|ts)",
		"<rootDir>/src/store/**/*.(js|ts)",
		"<rootDir>/src/utils/**/*.js",
		// Exclude
		"!<rootDir>/src/components/base/_globals.js",
		"!<rootDir>/src/components/icons/**/*",
		"!<rootDir>/src/pages/ActivationCode.page.vue",
		"!<rootDir>/src/pages/Imprint.page.vue",
		"!<rootDir>/src/pages/LernStoreDetails.page.vue",
		"!<rootDir>/src/pages/LernStoreOverview.page.vue",
		"!<rootDir>/src/pages/LoginInstances.page.vue",
		"!<rootDir>/src/pages/NewsCreate.page.vue",
		"!<rootDir>/src/pages/NewsEdit.page.vue",
		"!<rootDir>/src/pages/ProxyError.page.vue",
		"!<rootDir>/src/pages/TermsOfUse.vue",
	],

	// maxWorkers: 2, // limited for not taking all workers within of a single github action
};
