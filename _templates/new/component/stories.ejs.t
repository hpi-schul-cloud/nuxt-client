---
to: "<%= story ? ('stories/' + name + '.stories.js') : null %>"
---
import { storiesOf } from "@storybook/vue";
import outdent from "outdent";

import notes from "@docs/storybook/<%= name %>.md";
import <%= name %> from "@components/<%= name.match(/^Base/) ? 'ui/' : '' %><%= name %>";

storiesOf("<%= name %>", module)
	.addParameters({
		notes,
	})
	.add("<%= name %>", () => ({
		components: { <%= name %> },
		template: outdent`<<%= name %> />`,
		methods: {},
	}));
