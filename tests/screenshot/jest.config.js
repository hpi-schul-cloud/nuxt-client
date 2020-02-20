module.exports = {
	preset: "jest-puppeteer",
	testRegex: "./*\\.screenshot\\.js$",
	setupFilesAfterEnv: ["./setupJest.js"],
	globalSetup: "./globalSetup.js",
	globalTeardown: "./globalTeardown.js",
};
