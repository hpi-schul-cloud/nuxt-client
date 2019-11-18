import { storiesOf } from "@storybook/vue";

import notes from "@docs/storybook/Tabs.md";
import Tabs from "@components/organisms/Tabs/Tabs";
import SingleTab from "@components/organisms/Tabs/Tab";

storiesOf("Molecules|Tabs", module)
	.addParameters({
		notes,
	})
	.add("Template tabs", () => ({
		components: { Tabs, SingleTab },
		template: `
			<Tabs>
				<SingleTab name="Tab 1" :selected="true">Test</SingleTab>
				<SingleTab name="Tab 2">Test2</SingleTab>
				<SingleTab name="Tab 3">Test 3 lorum ipsum test with a long line of text</SingleTab>
			</Tabs>
		`,
		methods: {},
	}))
	.add("Template tab content", () => ({
		components: { SingleTab },
		template: `<SingleTab name="Tab 1" :selected="true">Lorum ipsum dipsum</SingleTab>`,
	}));
