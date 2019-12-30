<!-- eslint-disable max-lines -->

<template>
	<div class="table-outer">
		<div class="table-wrapper">
			<div class="toolbelt">
				<filter-menu
					v-if="filterable && selectedRowIds.length < 1"
					v-model="newFiltersSelected"
					:filters="filters"
				/>
				<row-selection-bar
					ref="rowSelectionBar"
					:actions="actions"
					:selected-rows="selectedRowIds"
					:all-rows-of-all-pages-selected="allRowsOfAllPagesSelected"
					:all-rows-of-current-page-selected="allRowsOfCurrentPageSelected"
					:total="tableDataTotal"
					@select-all-rows="selectAllRowsOfAllPages"
					@unselect-all-rows="unselectAllRowsOfAllPages"
					@fire-action="fireAction"
				/>
			</div>

			<table class="table">
				<thead>
					<tr>
						<th v-if="showRowSelection">
							<base-input
								type="checkbox"
								label="Alle Zeilen auswählen"
								label-hidden
								:vmodel="allRowsOfCurrentPageSelected"
								name="checkbox"
								@change.native="toggleAllRowSelectionsOfCurrentPage"
							/>
						</th>
						<th
							v-for="(column, index) in columns"
							:key="index"
							:class="{
								'is-current-sort': currentSortColumn === column,
								'is-sortable': column.sortable,
							}"
							cellspacing="0"
							@click.stop="sort(column)"
						>
							<div class="th-wrap">
								<span>{{ column.label }}</span>
								<base-icon
									v-if="currentSortColumn === column"
									:icon="isAsc ? 'arrow_upward' : 'arrow_downward'"
									source="material"
								/>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(row, rowindex) in visibleRows"
						:key="rowindex"
						:class="{ selected: isRowSelected(row) }"
						@click.shift="toggleRowSelection(row)"
					>
						<td v-if="showRowSelection">
							<base-input
								type="checkbox"
								:label="`Zeile ${rowindex + 1} auswählen`"
								label-hidden
								:vmodel="isRowSelected(row)"
								@change.native="toggleRowSelection(row)"
								@click.native.stop
							/>
						</td>
						<td v-for="(column, columnindex) in columns" :key="columnindex">
							<slot name="column" :row="row" :column="column">
								{{ getValueByPath(row, column.field) }}
							</slot>
						</td>
						<td>
							<slot name="extra-column" :row="row" :columns="columns"></slot>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<pagination
			class="mt--md"
			:current-page="currentPage"
			:total="tableDataTotal"
			:per-page="rowsPerPage"
			@update:per-page="$emit('update:rows-per-page', $event)"
			@update:current-page="$emit('update:current-page', $event)"
		/>
	</div>
</template>

<script>
import { getValueByPath, getNestedObjectValues, indexOf } from "@utils/helpers";
import camelCase from "lodash/camelCase";
import Pagination from "@components/organisms/Pagination.vue";
import FilterMenu from "./FilterMenu.vue";
import RowSelectionBar from "./RowSelectionBar.vue";
import defaultFiltersMixin from "@mixins/defaultFilters";

export default {
	components: {
		Pagination,
		FilterMenu,
		RowSelectionBar,
	},
	mixins: [defaultFiltersMixin],
	props: {
		actions: {
			type: Array,
			default: () => [],
		},
		backendPagination: Boolean,
		backendSorting: Boolean,
		columns: {
			type: Array,
			default: () => [],
		},
		currentPage: {
			type: Number,
			default: 1,
		},
		data: {
			type: Array,
			default: () => [],
		},
		filterable: {
			type: Boolean,
		},
		filters: {
			type: Array,
			default: () => [],
			validator: function(filters) {
				return filters.every((filter) => {
					const hasValidType = !!filter.type && ["string", "select", "number", "date", "fulltextSearch"].includes(filter.type);

					const hasValidMatchingType = (filter.type === "select" || filter.type === "fulltextSearch" || !!filter.matchingType && !!filter.matchingType.label);

					return (
						filter.label &&
						filter.property &&
						hasValidType &&
						hasValidMatchingType
					);
				});
			},
		},
		filtersSelected: {
			type: Array,
			default: () => [],
		},
		paginated: Boolean,
		rowsPerPage: {
			type: Number,
			default: 10,
		},
		showRowSelection: {
			type: Boolean,
		},
		selectedRows: {
			type: Array,
			default: () => [],
		},
		total: {
			type: Number,
			default: 0,
		},
		trackBy: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			editFilterActive: false,
			currentSortColumn: "",
			tableData: this.data,
			filterOpened: {},
			newFiltersSelected: this.filtersSelected,
			selectedRowIds: this.selectedRows.map(row => row[this.trackBy]),
			isAsc: false,
			defaultSort: [String, Array],
			defaultSortDirection: {
				type: String,
				default: "asc",
			},
		};
	},
	computed: {
		tableDataTotal() {
			return this.backendPagination ? this.total : this.data.length;
		},
		currentSortDirection() {
			return this.isAsc ? "asc" : "desc";
		},
		filteredRows() {
			return this.data.filter((row) => {
				return this.newFiltersSelected.every((filter) => {
					if (filter.type === "fulltextSearch") {
						return getNestedObjectValues(row).some((value) =>
							(value.toString() || "").includes(filter.value)
						);
					} else {
						const functionName = camelCase(
							`filter-${filter.type}-${(filter.matchingType || {}).value}`
						);
						const defaultFunctionName = camelCase(
							`filter-${filter.type}-default`
						);
						const filterFunction = (filter.matchingType || {}).implementation || this[functionName] || this[defaultFunctionName];
						return filterFunction(
							getValueByPath(row, filter.property),
							filter.value
						);
					}
				});
			});
		},
		filteredAndSortedRows() {
			if (
				this.backendSorting ||
				!this.currentSortColumn ||
				!this.currentSortColumn.sortable
			) {
				return this.filteredRows;
			}
			return this.sortBy(
				this.filteredRows,
				this.currentSortColumn.field,
				this.isAsc
			);
		},
		visibleRows() {
			if (!this.paginated) return this.filteredAndSortedRows;

			const { currentPage } = this;
			const { rowsPerPage } = this;
			if (this.filteredAndSortedRows.length <= rowsPerPage || rowsPerPage < 0) {
				return this.filteredAndSortedRows;
			} else {
				const start = (currentPage - 1) * rowsPerPage;
				const end = parseInt(start, 10) + parseInt(rowsPerPage, 10);
				return this.filteredAndSortedRows.slice(start, end);
			}
		},
		allRowsOfCurrentPageSelected() {
			return this.visibleRows.every((visibleRow) =>
				this.selectedRowIds.includes(visibleRow[this.trackBy])
			);
		},
		allRowsOfAllPagesSelected() {
			return this.filteredAndSortedRows.every(row =>
				this.selectedRowIds.includes(row[this.trackBy]));
		},
		newSelectedRows() {
			return this.data.filter(row => this.selectedRowIds.some(id => id === row[this.trackBy]));
		},
	},
	watch: {
		data(data) {
			this.selectedRowIds = this.selectedRowIds.filter(id => data.some(row => row[this.trackBy] === id))
			this.tableData = data;

			if (!this.backendSorting) {
				this.sort(this.currentSortColumn, true);
			}
		},
		filtersSelected() {
			this.newFiltersSelected = this.filtersSelected;
		},
		newFiltersSelected() {
			this.$emit("update:filters-selected", this.newFiltersSelected);
		},
		selectedRows(rows) {
			this.selectedRowIds = rows.map(row => row[this.trackBy]);
		},
	},
	methods: {
		getValueByPath,
		fireAction(action) {
			action.action(this.newSelectedRows);
			this.unselectAllRowsOfAllPages();
		},
		sort(column) {
			if (column === this.currentSortColumn) {
				this.isAsc = !this.isAsc;
				this.$emit("sort", column.field, this.isAsc ? "asc" : "desc");
			} else if (column.sortable) {
				this.currentSortColumn = column;
				this.isAsc = true;
				this.$emit("sort", column.field, "asc");
			}
		},
		sortBy(array, key, isAsc) {
			let sorted = [];
			// Sorting without mutating original data
			sorted = [...array].sort((a, b) => {
				// Get nested values from objects
				let newA = getValueByPath(a, key);
				let newB = getValueByPath(b, key);
				// sort boolean type
				if (typeof newA === "boolean" && typeof newB === "boolean") {
					return isAsc ? newA - newB : newB - newA;
				}
				if (!newA && newA !== 0) return 1;
				if (!newB && newB !== 0) return -1;
				if (newA === newB) return 0;
				newA = typeof newA === "string" ? newA.toUpperCase() : newA;
				newB = typeof newB === "string" ? newB.toUpperCase() : newB;
				return isAsc ? (newA > newB ? 1 : -1) : newA > newB ? -1 : 1;
			});
			return sorted;
		},
		isRowSelected(row) {
			return this.selectedRowIds.includes(row[this.trackBy]);
		},

		toggleRowSelection(row) {
			this.isRowSelected(row)? this.unselectRow(row) : this.selectRow(row);
			this.$emit("update:selected-rows", this.newSelectedRows);
		},

		selectRow(row) {
			if (!this.isRowSelected(row)) {
				this.selectedRowIds.push(row[this.trackBy]);
			}
		},

		unselectRow(row) {
			const index = indexOf(this.selectedRowIds, row[this.trackBy]);
			if (index >= 0) {
				this.selectedRowIds.splice(index, 1);
			}
		},

		toggleAllRowSelectionsOfCurrentPage() {
			this.allRowsOfCurrentPageSelected? this.unselectAllRowsOfCurrentPage() : this.selectAllRowsOfCurrentPage();
			this.$emit("all-rows-of-current-page-selected", this.newSelectedRows);
			this.$emit("update:selected-rows", this.newSelectedRows);
		},

		selectAllRowsOfCurrentPage() {
			this.visibleRows.forEach((row) => {
				if (!this.selectedRowIds.includes(row[this.trackBy])) {
					this.selectedRowIds.push(row[this.trackBy]);
				}
			});
		},

		unselectAllRowsOfCurrentPage() {
			this.selectedRowIds = this.selectedRowIds.filter(
				id => this.visibleRows.every(row => row[this.trackBy] != id)
			);
		},

		selectAllRowsOfAllPages() {
			this.filteredRows.forEach((row) => {
				if (!this.selectedRowIds.includes(row[this.trackBy])) {
					this.selectedRowIds.push(row[this.trackBy]);
				}
			});
			this.$emit("update:selected-rows", this.newSelectedRows);
			this.$emit("all-rows-selected", this.newSelectedRows);
		},

		unselectAllRowsOfAllPages() {
			this.selectedRowIds = [];
			this.$emit("update:selected-rows", this.newSelectedRows);
			this.$emit("all-rows-selected", this.newSelectedRows);
		}
	},
};
</script>

<style lang="scss">
@import "@styles";
.table-wrapper {
	overflow-x: auto;
}
.toolbelt {
	display: flex;
	align-items: center;
	height: 55px;
}
.table {
	width: 100%;
	thead {
		font-weight: var(--font-weight-bold);
		tr {
			th {
				cursor: pointer;
				border-bottom: calc(2 * var(--border-width)) solid var(--color-gray);
				opacity: 0.66;
				&.is-current-sort {
					opacity: 1;
				}
				.th-wrap {
					display: flex;
					align-items: center;
					padding: var(--space-sm);
				}
			}
		}
	}
	tbody {
		tr {
			&:nth-child(odd) {
				background-color: var(--color-white);
			}
			&:nth-child(even) {
				background-color: var(--color-gray-light);
			}
			&.selected {
				background-color: var(--color-info-light);
			}
			td {
				padding: var(--space-xs);
			}
		}
	}
}
</style>
