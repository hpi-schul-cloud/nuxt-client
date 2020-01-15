/*
This test mostly follows this tutorial:
https://storybook.js.org/docs/testing/automated-visual-testing/

Which is using:
https://github.com/americanexpress/jest-image-snapshot
https://github.com/smooth-code/jest-puppeteer
+ an jest setup routine which gets all available stories from a storybook entry
*/

const fs = require("fs");
const { storybookUrl, routesFilePath } = require("./config");
const ignoredStories = require("./ignoredStories");

const blockRequest = (request) => {
	// block webpack hot reload connection
	if (request.url().endsWith("__webpack_hmr")) {
		request.abort();
	} else {
		request.continue();
	}
};

const storyNotIgnored = (storyPath) =>
	!ignoredStories.some(
		(regexString) => !!new RegExp(regexString).exec(storyPath)
	);

// get stories to screenshot
const allStories = JSON.parse(fs.readFileSync(routesFilePath));
const stories = allStories.filter(storyNotIgnored);

it("have routes to test", () => {
	expect(stories.length).not.toBe(0);
	// eslint-disable-next-line no-console
	console.log(`${stories.length} stories to screenshot found`);
});

describe("screenshots", () => {
	jest.setTimeout(10000); // 10s

	stories.forEach((storyPath) => {
		const storyName = storyPath.replace("/story/", "");
		const [group, name] = storyName.split("--");

		describe(group, () => {
			it(name, async () => {
				// You must open a new page for every test if you want to intercept requests
				// https://github.com/smooth-code/jest-puppeteer/issues/147#issuecomment-431259166
				page = await browser.newPage();

				// block webpack hot reload connection
				await page.setRequestInterception(true);
				page.on("request", blockRequest);

				// take screenshot of story
				await page.goto(`${storybookUrl}/iframe.html?path=${storyPath}`, {
					waitUntil: "networkidle0",
				});
				const image = await page.screenshot();

				// compare snapshots
				expect(image).toMatchImageSnapshot({
					customDiffConfig: {
						threshold: 0.1,
					},
					failureThresholdType: "percent",
					failureThreshold: 0.1, // accept <x% overall diff
				});
			});
		});
	});
});
