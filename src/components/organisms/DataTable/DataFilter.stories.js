import { storiesOf } from "@storybook/vue";
import { object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import DataFilter from "./DataFilter";

import { tableData, tableFilters } from "./DataTable.data-factory.js";

storiesOf("6 Organisms/DataTable/SubComponents", module).add(
	"FilterMenu",
	() => {
		const data = tableData(10);

		return {
			components: { DataFilter },
			template: `
			<DataFilter
				:data="data"
				:filters="tableFilters"
				:activeFilters="activeFilters"
				@update:active-filters="onUpdateActiveFilters"
				@update:filtered-data="onUpdateFilteredData"
			/>`,
			data: () => ({
				data,
				tableFilters,
				activeFilters: object("activeFilters", [tableFilters[0]]),
			}),
			methods: {
				onUpdateActiveFilters: action("@update:active-filters"),
				onUpdateFilteredData: action("@update:filtered-data"),
			},
		};
	}
);
