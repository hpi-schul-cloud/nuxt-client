import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import DataFilterChips from "./DataFilterChips";

storiesOf("6 Organisms/DataFilter", module).add("DataFilterChips", () => {
	return {
		components: { DataFilterChips },
		template: `
			<DataFilterChips
				:chips="chips"
				@open="onOpen"
				@remove="onRemove"
			/>`,
		data: () => ({
			chips: [
				{
					deletable: false,
					id: "group-1",
					label: "Einträge pro Seite: 5",
				},
				{
					deletable: true,
					id: "group-2",
					label: "Alter >= 16",
				},
			],
		}),
		methods: {
			onOpen: action("@open"),
			onRemove: action("@remove"),
		},
	};
});
