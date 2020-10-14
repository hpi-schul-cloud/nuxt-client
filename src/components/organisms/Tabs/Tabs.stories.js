import { storiesOf } from "@storybook/vue";

import Tabs from "@components/organisms/Tabs/Tabs";
import SingleTab from "@components/atoms/Tab";

storiesOf("5 Molecules/Tabs", module)
	.add("Tabs", () => ({
		components: { Tabs, SingleTab },
		template: `
			<Tabs>
				<SingleTab name="Lerninhalte" :selected="true" iconName="lerninhalte">Test</SingleTab>
				<SingleTab name="Gruppen" iconName="gruppen">Test2</SingleTab>
				<SingleTab name="Tab 3" permission="YOU_SHALL_NOT_PASS">This and Tab 3 should be not visible!</SingleTab>
				<SingleTab name="Tools" iconName="tools">Test 4 lorum ipsum test with a long line of text</SingleTab>
				<SingleTab name="'Empty'" iconName="">Empty</SingleTab>
			</Tabs>
		`,
		methods: {},
	}))
	.add("SingleTab", () => ({
		components: { SingleTab },
		template: `<SingleTab name="Tab 1" :selected="true">Lorum ipsum dipsum</SingleTab>`,
	}));
