import { storiesOf } from "@storybook/vue";


import NavigationBar from "./NavigationBar";

storiesOf("Molecules|NavigationBar", module)
	.add("default", () => ({
		components: { NavigationBar },
		template: `<NavigationBar />`,
		data: () => ({}),
	}));
