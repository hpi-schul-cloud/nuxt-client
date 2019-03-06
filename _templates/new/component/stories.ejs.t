---
to: "<%= story ? ('stories/' + name + '.stories.js') : null %>"
---
import { storiesOf } from "@storybook/vue";
import <%= name %> from "@components/<%= name.match(/^Base/) ? 'ui/' : '' %><%= name %>.vue";
import notes from "@docs/components/<%= name %>.md";

storiesOf("<%= name %>", module)
	.addParameters({
		notes,
	})
	.add("<%= name %>", () => ({
		components: { <%= name %> },
		template: "",
		methods: {},
	}));
