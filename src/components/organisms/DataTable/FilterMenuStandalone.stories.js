import { storiesOf } from "@storybook/vue";
import { boolean, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import FilterMenuStandalone from "./FilterMenuStandalone";

import {
	tableData,
	tableFilters,
	tableQuery,
	tableActiveFilters,
} from "./DataTable.data-factory.js";

storiesOf("6 Organisms/DataTable/SubComponents", module).add(
	"FilterMenu",
	() => {
		const data = tableData(10);

		return {
			components: { FilterMenuStandalone },
			template: `
			<FilterMenuStandalone
				:backendFiltering="backendFiltering"
				:data="data"
				:filters="filters"
				:activeFilters="activeFilters"
				:query="query"
				@update:query="onUpdateQuery"
				@update:filtered-data="onUpdateFilteredData"
			/>`,
			data: () => ({
				data,
				backendFiltering: boolean("backendFiltering", false),
				query: object("query", tableQuery),
				filters: object("filters", tableFilters),
				activeFilters: object("activeFilters", tableActiveFilters),
			}),
			methods: {
				onUpdateQuery: action("@update:query"),
				onUpdateFilteredData: action("@update:filtered-data"),
			},
		};
	}
);
