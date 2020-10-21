import { storiesOf } from "@storybook/vue";

import Tabs from "@components/organisms/Tabs/Tabs";
import TabContent from "@components/atoms/Tab";

storiesOf("5 Molecules/Tabs", module)
	.add("Tabs", () => ({
		components: { Tabs, TabContent },
		template: `
			<Tabs>
				<TabContent name="Lerninhalte" :selected="true" iconName="lerninhalte">Test</TabContent>
				<TabContent name="Gruppen" iconName="gruppen">Test2</TabContent>
				<TabContent name="Tab 3" permission="YOU_SHALL_NOT_PASS">This and Tab 3 should be not visible!</TabContent>
				<TabContent name="Tools" iconName="tools">Test 4 lorum ipsum test with a long line of text</TabContent>
			</Tabs>
		`,
		methods: {},
	}))
	.add("TabContent", () => ({
		components: { TabContent },
		template: `<TabContent name="Tab 1" :selected="true">Tab Content</TabContent>`,
	}));
