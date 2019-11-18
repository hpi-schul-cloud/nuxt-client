---
to: "<%= story ? ('src/components/' + type + '/' + name + '.stories.js') : null %>"
---
import { storiesOf } from "@storybook/vue";

import notes from "@docs/storybook/<%= type %>/<%= name %>.md";
import <%= name %> from "./<%= name %>";

storiesOf("<%= type.charAt(0).toUpperCase() + type.slice(1) %>|<%= name %>", module)
	.addParameters({
		notes,
	})
	.add("default", () => ({
		components: { <%= name %> },
		template: `<<%= name %> />`,
		methods: {},
	}));
