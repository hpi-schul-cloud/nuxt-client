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
const sharp = require("sharp");

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

/**
 * removes whitespace around image content
 * @param {Buffer} imageBuffer
 */
const trimImage = async (imageBuffer) => {
	const padding = 16;
	return sharp(imageBuffer)
		.trim(0.000000001) // default threshold: 10
		.extend({
			top: padding,
			bottom: padding,
			left: padding,
			right: padding,
			background: { r: 255, g: 255, b: 255, alpha: 1 },
		})
		.toBuffer();
};

// get stories to screenshot
const allStories = JSON.parse(fs.readFileSync(routesFilePath));
const stories = allStories.filter(storyNotIgnored);

it("have routes to test", () => {
	expect(stories.length).not.toBe(0);
	// eslint-disable-next-line no-console
	console.log(`${stories.length} stories to screenshot found`);
});

describe("screenshots", () => {
	jest.setTimeout(15000); // in ms

	stories.forEach((storyPath) => {
		const storyName = storyPath.replace("/story/", "");
		const [group, name] = storyName.split("--");

		describe(group, () => {
			it.concurrent(name, async () => {
				// You must open a new page for every test if you want to intercept requests
				// https://github.com/smooth-code/jest-puppeteer/issues/147#issuecomment-431259166
				const localPage = await browser.newPage();

				// block webpack hot reload connection (when using npm run dev:storybook)
				await localPage.setRequestInterception(true);
				localPage.on("request", blockRequest);

				// load story
				await localPage.goto(`${storybookUrl}/iframe.html?path=${storyPath}`, {
					waitUntil: "networkidle0",
				});
				// hide caret in input fields
				await localPage.addStyleTag({
					content: `* { caret-color: transparent !important; }`,
				});
				// take screenshot of story
				const image = await localPage.screenshot({
					fullPage: true, // capture full page including below the fold content
				});

				// close page to free up some memory
				localPage.close();

				// crop image to content
				const croppedImage = await trimImage(image);

				// compare snapshots
				expect(croppedImage).toMatchImageSnapshot({
					customSnapshotIdentifier: (
						testPath,
						currentTestName,
						counter = 0
						// defaultIdentifier
					) => `${group}-${name}_${counter + 1}`,
					customDiffConfig: {
						// each pixel can be x% off of the baseline
						threshold: 0.25, // (0.01 is 1%, default 0.01)
					},
					blur: 5,
					failureThresholdType: "percent",
					failureThreshold: 0.03, // accept <x% overall diff (0.01 is 1%, default: 0)
					runInProcess: true, // disable child spawn for jest multithread safetiness. Otherwise images may get switched with each other.
					allowSizeMismatch: true,
				});
			});
		});
	});
});
