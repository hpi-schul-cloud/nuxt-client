const fs = require("fs");
const { storybookUrl, routesFilePath } = require("./config");
const stories = JSON.parse(fs.readFileSync(routesFilePath));

it("have routes to test", () => {
	expect(stories.length).not.toBe(0);
	// eslint-disable-next-line no-console
	console.log(`${stories.length} stories to screenshot found`);
});

describe("screenshots", () => {
	stories.forEach((storyPath) => {
		const storyName = storyPath.replace("/story/", "");
		const [group, name] = storyName.split("--");
		describe(group, () => {
			it(name, async () => {
				await page.goto(`${storybookUrl}/iframe.html?path=${storyPath}`);
				const image = await page.screenshot();
				expect(image).toMatchImageSnapshot();
			});
		});
	});
});
