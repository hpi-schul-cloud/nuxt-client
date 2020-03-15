import { storiesOf } from "@storybook/vue";
import {
	text,
	boolean,
	number,
	array,
	select,
	object,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import DataTable from "./DataTable";
import DataFilter from "../DataFilter/DataFilter";
import notes from "./DataTable.md";

import {
	tableData,
	tableColumns,
	tableActions,
	tableFilters,
	tableQuery,
} from "./DataTable.data-factory.js";

storiesOf("6 Organisms/DataTable", module)
	.addParameters({
		notes,
	})
	.add("DataTable", () => {
		const sortabelRows = tableColumns
			.filter((c) => c.sortable)
			.reduce((obj, c) => {
				obj[c.field] = c.field;
				return obj;
			}, {});
		const total = 100;
		const randomData = tableData(total);
		return {
			data: () => ({
				columns: tableColumns,
				randomData,
				filteredData: randomData,
				trackBy: text("trackBy", "id"),

				filters: tableFilters,
				query: object("activeFilters", tableQuery),

				total: total,
				currentPage: number("currentPage", 1),
				paginated: boolean("paginated", true),
				rowsPerPage: number("rowsPerPage", 5),

				rowsSelectable: boolean("rowsSelectable", true),
				selection: array(
					"selection",
					[randomData[0].id, randomData[1].id],
					","
				),

				actions: tableActions(randomData),

				sortBy: select("sortBy (optional)", sortabelRows),
				sortOrder: select(
					"sortOrder (optional)",
					{ asc: "asc", desc: "desc" },
					"asc"
				),
			}),
			components: { DataTable, DataFilter },
			methods: {
				onUpdateCurrentPage: action("@update:current-page"),
				onUpdateRowsPerPage: action("@update:rows-per-page"),
				onUpdateSelection: action("@update:selection"),
				onUpdateFilteredData(newfilteredData) {
					this.filteredData = newfilteredData;
				},
			},
			template: `
			<div>
				<DataFilter
					:data="randomData"
					:filters="filters"
					:query="query"
					@update:filtered-data="onUpdateFilteredData"
				/>
				<DataTable
					:columns="columns"
					:data="filteredData"
					:trackBy="trackBy"

					:total="total"
					:current-page.sync="currentPage"
					@update:current-page="onUpdateCurrentPage"
					:paginated="paginated"
					:rows-per-page.sync="rowsPerPage"
					@update:rows-per-page="onUpdateRowsPerPage"

						:rowsSelectable="rowsSelectable"
						:selection.sync="selection"
						@update:selection="onUpdateSelection"

						:actions="actions"

						:sortBy.sync="sortBy"
						:sortOrder.sync="sortOrder"
					>
						<template v-slot:datacolumn-age="slotProps">
							<span style="text-decoration: underline">
							{{ slotProps.data }}
							</span>
						</template>
					</DataTable>
				</div>
			`,
		};
	});
