import { storiesOf } from "@storybook/vue";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import FilterModal from "./FilterModal";

storiesOf("4 Base UI Components/Modals", module).add("FilterModal", () => ({
	components: { FilterModal },
	data: () => ({
		active: boolean("active", false),
		filterOpened: {
			label: "Vorname",
			type: "text",
			property: "firstName",
			value: "Mario",
			matchingType: {
				value: "contains",
				label: "enthält",
			},
		},
	}),
	template: `
		<div>
		<base-button @click="active = true">
				Open Modal
		</base-button>
		<filter-modal :active.sync="active" :filterOpened="filterOpened" @update:active="onUpdateActive" @set-filter="onSetFilter"/>
		</div>`,
	methods: {
		onSetFilter: action("set-filter"),
		onUpdateActive: action("@update:active"),
	},
}));
