---
to: "<%= story ? ('stories/' + name + '.stories.js') : null %>"
---
import { storiesOf } from "@storybook/vue";

import notes from "@docs/storybook/<%= name %>.md";
import <%= name %> from "@components/<%= name.match(/^Base/) ? 'ui/' : '' %><%= name %>";

storiesOf("<%= name %>", module)
	.addParameters({
		notes,
	})
	.add("<%= name %>", () => ({
		components: { <%= name %> },
		template: `<<%= name %> />`,
		methods: {},
	}));
