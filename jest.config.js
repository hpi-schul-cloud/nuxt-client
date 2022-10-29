// process.env.TZ = "Europe/Berlin";

module.exports = {
	preset: "@vue/cli-plugin-unit-jest/presets/typescript",
	testMatch: ["**/*.unit.{j,t}s?(x)"],
	setupFiles: ["./tests/unit/setup.js", "./tests/unit/setup-new.js"],
};
