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

	// setupFiles: ["./tests/unit/setup.js"],
	setupFiles: ["./tests/unit/setup-new.js"],
};
