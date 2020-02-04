import { storiesOf } from "@storybook/vue";
import { text, boolean, number, object, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import DataTable from "./DataTable";

import {
	tableData,
	tableColumns,
	tableFilters,
	tableActions,
} from "@@/stories/mockData/DataTable";

storiesOf("Organisms/DataTable", module).add("DataTable", () => {
	return {
		data: () => ({
			actions: tableActions,
			columns: tableColumns,
			currentPage: number("currentPage", 1),
			filterable: boolean("filterable", true),
			filters: tableFilters,
			filtersSelected: object("filtersSelected", [tableFilters[0]]),
			paginated: boolean("paginated", true),
			rowsPerPage: number("rowsPerPage", 5),
			selectableRows: boolean("selectableRows", true),
			selectionType: select(
				"selectionType",
				{ inclusive: "inclusive", exclusive: "exclusive" },
				"inclusive"
			),
			selectedRowIds: object("selectedRowIds", []),
			total: number("total", 50),
			trackBy: text("trackBy", "id"),
			randomData: tableData,
		}),
		components: { DataTable },
		methods: {
			onAllRowsSelected: action("@all-rows-selected"),
			onAllRowsOfCurrentPageSelected: action(
				"@all-rows-of-current-page-selected"
			),
			onSort: action("@sort"),
			onUpdateCurrentPage: action("@update:current-page"),
			onUpdateFiltersSelected: action("@update:filters-selected"),
			onUpdateRowsPerPage: action("@update:rows-per-page"),
			onUpdateSelectedRows: action("@update:selected-rows"),
		},
		template: `
			<DataTable v-slot:default="slotProps"
				:actions="actions"
				:columns="columns"
				:current-page.sync="currentPage"
				:data="randomData(total)"
				:filterable="filterable"
				:filters="filters"
				:filtersSelected="filtersSelected"
				:paginated="paginated"
				:rows-per-page.sync="rowsPerPage"
				:selectableRows="selectableRows"
				:selectionType.sync="selectionType"
				:total="total"
				:trackBy="trackBy"
				@all-rows-selected="onAllRowsSelected"
				@all-rows-of-current-page-selected="onAllRowsOfCurrentPageSelected"
				@sort="onSort"
				@update:current-page="onUpdateCurrentPage"
				@update:filters-selected="onUpdateFiltersSelected"
				@update:rows-per-page="onUpdateRowsPerPage""
			/>
		`,
	};
});
