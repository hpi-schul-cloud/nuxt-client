import { storiesOf } from "@storybook/vue";
import outdent from "outdent";

import notes from "@docs/storybook/TemplateTabs.md";
// import TemplateTabs from "@components/TemplateTabs.vue";
import tabs from "@components/TemplateTabs.vue";
import tab from "@components/TemplateTab.vue";

storiesOf("TemplateTabs", module)
	.addParameters({
		notes,
	})
	.add("TemplateTabs", () => ({
		components: { tabs, tab },
		template: outdent`<tabs> <tab name="Tab 1" :selected="true">Test</tab><tab name="Tab 2">Test2</tab></tab></tabs>`,
		methods: {},
	}));
