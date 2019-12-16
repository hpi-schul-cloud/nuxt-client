import { storiesOf, getStorybook } from "@storybook/vue";

/*
	Please be carefull when touching this story!
	You may break all screenshot tests
*/

const cleanPath = (str) => str.replace(/[\| ]/g, "-").toLowerCase()
const stories = getStorybook().map(group => group.stories.map(story => `/story/${cleanPath(group.kind).replace(/[\/]/g, "-")}--${cleanPath(story.name).replace(/[\/]/g, "")}`)).flat()

storiesOf("Story List", module)
	.add("All", () => ({
		template: `<div>
		<small>* This story is used by the screenshot tests to get all stories. Unfortunatly storybook doesn't offer an API to get all stories.</small>
		<p>${stories.length} Stories:</p>
		<pre id="stories">${stories.join("\n")}</pre>
		</div>
		`
	}));
