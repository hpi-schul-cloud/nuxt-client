import { storiesOf } from "@storybook/vue";

import Tabs from "@components/organisms/Tabs/Tabs";
import SingleTab from "@components/atoms/Tab";

storiesOf("5 Molecules/Tabs", module)
	.add("Tabs", () => ({
		components: { Tabs, SingleTab },
		template: `
			<Tabs>
				<SingleTab name="Tab 1">Test</SingleTab>
				<SingleTab name="Tab 2" :selected="true">Test2</SingleTab>
				<SingleTab name="Tab 3" permission="YOU_SHALL_NOT_PASS">This and Tab 3 should be not visible!</SingleTab>
				<SingleTab name="Tab 4">Test 4 lorum ipsum test with a long line of text</SingleTab>
			</Tabs>
		`,
		methods: {},
	}))
	.add("SingleTab", () => ({
		components: { SingleTab },
		template: `<SingleTab name="Tab 1" :selected="true">Lorum ipsum dipsum</SingleTab>`,
	}));
