const fs = require("fs");
const { teardown: teardownPuppeteer } = require("jest-environment-puppeteer");
const { routesFilePath } = require("./config");

module.exports = async function globalTeardown(globalConfig) {
	// Your global teardown
	await teardownPuppeteer(globalConfig);
	fs.unlinkSync(routesFilePath);
};
