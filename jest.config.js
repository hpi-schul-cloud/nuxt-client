// process.env.TZ = "Europe/Berlin";

module.exports = {
	preset: "@vue/cli-plugin-unit-jest/presets/typescript",
	testMatch: ["**/*.unit.{j,t}s?(x)"],

	transform: {
		"^.+\\.jsx?$": require.resolve("ts-jest"),
		"^.+\\.tsx?$": require.resolve("ts-jest"),
	},
	moduleNameMapper: {
		"^axios$": require.resolve("axios"),
	},

	// setupFiles: ["./tests/unit/setup.js"],
	// setupFiles: ["./tests/unit/setup-new.js"],
};
