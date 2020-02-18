import { storiesOf } from "@storybook/vue";
import { text, boolean, number, array, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import BackendDataTable from "./BackendDataTable";

import {
	tableData,
	tableColumns,
	tableActions,
} from "./DataTable.data-factory.js";

const total = 100;
const randomData = tableData(total);

storiesOf("6 Organisms/DataTable", module).add("BackendDataTable", () => {
	const sortableRows = tableColumns
		.filter((c) => c.sortable)
		.reduce((obj, c) => {
			obj[c.field] = c.field;
			return obj;
		}, {});
	return {
		data: () => ({
			columns: tableColumns,
			randomData,
			trackBy: text("trackBy", "id"),

			total: total,
			currentPage: number("currentPage", 1),
			paginated: boolean("paginated", true),
			rowsPerPage: number("rowsPerPage", 5),

			rowsSelectable: boolean("rowsSelectable", true),
			selectionType: select(
				"selectionType",
				{ inclusive: "inclusive", exclusive: "exclusive" },
				"inclusive"
			),
			selectedRowIds: array("selectedRowIds", [
				randomData[0].id,
				randomData[1].id,
			]),

			actions: tableActions(randomData),

			sortBy: select("sortBy", sortableRows, Object.keys(sortableRows)[0]),
			sortOrder: select("sortOrder", { asc: "asc", desc: "desc" }, "asc"),
		}),
		components: { BackendDataTable },
		methods: {
			onUpdateCurrentPage: action("@update:current-page"),
			onUpdateRowsPerPage: action("@update:rows-per-page"),
			onUpdateSelection: action("@update:selection"),
			onUpdateSelectionType: action("@update:selectionType"),
			onUpdateSelectedRowIds: action("@update:selectedRowIds"),
			onSort: action("@sort"),
		},
		template: `
			<BackendDataTable
				:columns="columns"
				:data="randomData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)"

				:trackBy="trackBy"

				:total="total"
				:current-page.sync="currentPage"
				@update:current-page="onUpdateCurrentPage"
				:paginated="paginated"
				:rows-per-page.sync="rowsPerPage"
				@update:rows-per-page="onUpdateRowsPerPage"

				:rowsSelectable="rowsSelectable"
				:selectionType.sync="selectionType"
				:selectedRowIds.sync="selectedRowIds"
				@update:selection="onUpdateSelection"
				@update:selectionType="onUpdateSelectionType"
				@update:selectedRowIds="onUpdateSelectedRowIds"

				:actions="actions"

				:sortBy.sync="sortBy"
				:sortOrder.sync="sortOrder"
				@sort="onSort"
			>
				<template v-slot:datacolumn-age="slotProps">
					<span style="text-decoration: underline">
					{{ slotProps.data }}
					</span>
				</template>
			</BackendDataTable>
		`,
	};
});
