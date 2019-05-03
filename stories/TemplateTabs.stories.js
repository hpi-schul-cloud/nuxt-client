import { storiesOf } from "@storybook/vue";
import outdent from "outdent";

import notes from "@docs/storybook/TemplateTabs.md";
import TemplateTabs from "@components/TemplateTabs";
import TemplateTab from "@components/TemplateTab";

storiesOf("TemplateTabs", module)
	.addParameters({
		notes,
	})
	.add("Template tabs", () => ({
		components: { TemplateTabs, TemplateTab },
		template: outdent`
			<TemplateTabs>
				<TemplateTab name="Tab 1" :selected="true">Test</TemplateTab>
				<TemplateTab name="Tab 2">Test2</TemplateTab>
				<TemplateTab name="Tab 3">Test 3 lorum ipsum test with a long line of text</TemplateTab>
			</TemplateTabs>
		`,
		methods: {},
	}))
	.add("Template tab content", () => ({
		components: { TemplateTab },
		template: outdent`<TemplateTab name="Tab 1" :selected="true">Lorum ipsum dipsum</TemplateTab>`,
	}));
