import { storiesOf } from "@storybook/vue";
import { boolean, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import DataFilter from "./DataFilter";

import {
	tableData,
	tableFilters,
	tableQuery,
	tableActiveFilters,
} from "@components/organisms/DataTable/DataTable.data-factory.js";

import notes from "./DataFilter.md";

storiesOf("6 Organisms/DataTable/SubComponents", module)
	.addParameters({
		notes,
	})
	.add("DataFilter", () => {
		const data = tableData(10);

		return {
			components: { DataFilter },
			template: `
			<DataFilter
				:backendFiltering="backendFiltering"
				:data="data"
				:filters="filters"
				:activeFilters="activeFilters"
				:query="query"
				@update:query="onUpdateQuery"
				@update:filtered-data="onUpdateFilteredData"
				@update:filter-query="onUpdateFilterQuery"
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
				onUpdateFilterQuery: action("@update:filter-query"),
			},
		};
	});
