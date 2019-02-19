---
to: "<%= story ? ('stories/' + name + '.stories.js') : null %>"
---
import { storiesOf } from "@storybook/vue";
import { withMarkdownNotes } from "@storybook/addon-notes";
import <%= name %> from "@components/<%= name.match(/^Base/) ? 'ui/' : '' %><%= name %>.vue";
import <%= name %>Doc from "@docs/components/<%= name %>.md";

storiesOf("<%= name %>", module)
	.addDecorator(withMarkdownNotes(<%= name %>Doc))
	.add("<%= name %>", () => ({
		components: { <%= name %> },
		template: "",
		methods: {},
	}));
