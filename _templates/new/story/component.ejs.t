---
to: "stories/<%= storyGroup %>.js"
---
import { storiesOf } from "@storybook/vue";

storiesOf("<%= storyGroup %>", module)
	.add("<%= firstStory %>", () => ({
		template: `<div>Story: <%= firstStory %></div>`,
	}));
