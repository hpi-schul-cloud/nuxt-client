const puppeteer = require('puppeteer');
const fs = require('fs');
const { setup: setupPuppeteer } = require('jest-environment-puppeteer')

const { storybookUrl, routesFilePath } = require("./config")

const fetchRoutes = async () => {
	const browser = await puppeteer.launch();
  const page = await browser.newPage();
	await page.goto(`${storybookUrl}/iframe.html?path=/story/story-list--all`, { waitUntil: "load" });
	const HTML = await page.$eval("#stories", e => e.innerHTML);
	await browser.close();
	return HTML.split("\n").map(e => e.trim())
}

const writeJson = (filename, json) => {
	fs.writeFileSync(filename, JSON.stringify(json));
}

module.exports = async function globalSetup(globalConfig) {
	await setupPuppeteer(globalConfig)
	const routes = await fetchRoutes()
	writeJson(routesFilePath, routes);
}
