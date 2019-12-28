import { storiesOf } from "@storybook/vue";
import { text, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import DropdownMenu from "@components/organisms/DropdownMenu";

storiesOf("Organisms", module).add("DropdownMenu", () => ({
	components: { DropdownMenu },
	data: () => ({
		title: text("title", "Dropdown"),
		items: object("items", [{ label: "item a" }, { label: "item b" }]),
	}),
	template: `<DropdownMenu :title="title" :items="items" @input="onInput"/>`,
	methods: {
		onInput: action("@input"),
	},
}));
