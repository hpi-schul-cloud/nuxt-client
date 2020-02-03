import { storiesOf } from "@storybook/vue";
import { text, boolean, number, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import BackendDataTable from "./BackendDataTable";

import {
	tableData,
	tableColumns,
	tableFilters,
	tableActions,
} from "@storyMockData/BaseTable";

storiesOf("Organisms/DataTable", module).add("BackendDataTable", () => ({
	data: () => ({
		actions: tableActions,
		backendPagination: boolean("backendPagination", false),
		backendSorting: boolean("backendSorting", false),
		columns: tableColumns,
		currentPage: number("currentPage", 1),
		data: tableData,
		filterable: boolean("filterable", true),
		filters: tableFilters,
		filtersSelected: object("filtersSelected", [tableFilters[0]]),
		paginated: boolean("paginated", true),
		rowsPerPage: number("rowsPerPage", 5),
		showRowSelection: boolean("showRowSelection", true),
		selectedRows: object("selectedRows", [tableData[0]]),
		total: number("total", 10),
		trackBy: text("trackBy", "id"),
	}),
	components: { BackendDataTable },
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
			<BackendDataTable v-slot:default="slotProps"
				:actions="actions"
				:backend-pagination="backendPagination"
				:backend-sorting="backendSorting"
				:columns="columns"
				:current-page.sync="currentPage"
				:data="data"
				:filterable="filterable"
				:filters="filters"
				:filtersSelected="filtersSelected"
				:paginated="paginated"
				:rows-per-page.sync="rowsPerPage"
				:showRowSelection="showRowSelection"
				:selectedRows="selectedRows"
				:total="total"
				:trackBy="trackBy"
				@all-rows-selected="onAllRowsSelected"
				@all-rows-of-current-page-selected="onAllRowsOfCurrentPageSelected"
				@sort="onSort"
				@update:current-page="onUpdateCurrentPage"
				@update:filters-selected="onUpdateFiltersSelected"
				@update:rows-per-page="onUpdateRowsPerPage"
				@update:selected-rows="onUpdateSelectedRows">
			</BackendDataTable>
		`,
}));
