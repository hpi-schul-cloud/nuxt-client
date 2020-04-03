import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import DataFilterSelect from "./DataFilterSelect";

storiesOf("6 Organisms/DataFilter", module).add("DataFilterSelect", () => {
	return {
		components: { DataFilterSelect },
		template: `
			<DataFilterSelect
				:labelAdd="labelAdd"
				:options="options"
				@openFilter="onOpenFilter"
			/>`,
		data: () => ({
			labelAdd: text("labelAdd", "Add Filter"),
			options: [
				{
					id: "group-1",
					title: "Items per page",
				},
				{
					id: "group-2",
					title: "Birthdate",
				},
				{
					id: "group-3",
					title: "Age",
				},
			],
		}),
		methods: {
			onOpenFilter: action("@openFilter"),
		},
	};
});
