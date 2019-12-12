import { storiesOf } from "@storybook/vue";

import ListGridViewToggle from "./ListGridViewToggle";

storiesOf("Molecules|ListGridViewToggle", module).add("default", () => ({
	components: { ListGridViewToggle },
	template: `<div>
		<ListGridViewToggle v-model="viewType"/>
		{{viewType}}
	</div>`,
	data: () => ({ viewType: "grid" }),
}));
