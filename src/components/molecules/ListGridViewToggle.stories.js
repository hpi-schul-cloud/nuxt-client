import { storiesOf } from "@storybook/vue";

import ListGridViewToggle from "./ListGridViewToggle";

storiesOf("Molecules|ListGridViewToggle", module).add("default", () => ({
	components: { ListGridViewToggle },
	template: `<ListGridViewToggle />`,
	data: () => ({}),
}));
