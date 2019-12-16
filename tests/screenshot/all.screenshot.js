const fs = require('fs');
const { storybookUrl, routesFilePath } = require("./config")
const stories = JSON.parse(fs.readFileSync(routesFilePath));

describe("screenshot tests", () => {

	it("have routes to test", () => {
		expect(stories.length).not.toBe(0)
	})

	stories.forEach((storyPath) => {
		const storyName = storyPath.replace("/story/", "");
		const [group, name] = storyName.split("--");
		describe(group, () => {
			it(name, async () => {
				// APIs from jest-puppeteer
				await page.goto(`${storybookUrl}/iframe.html?path=${storyPath}`);
				const image = await page.screenshot();
				// API from jest-image-snapshot
				expect(image).toMatchImageSnapshot();
			})
		})
	})
})
