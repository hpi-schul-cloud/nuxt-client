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
					:total="total"
					@select-all-rows="selectAllRowsOfAllPages"
					@unselect-all-rows="unselectAllRowsOfAllPages"
					@fire-action="fireAction"
				/>
			</div>

			<table class="table">
				<thead>
					<component
						:is="componentHeaderRow"
						:all-rows-selectable="selectableRows"
						:all-rows-selected="allRowsOfCurrentPageSelected"
						:columns="columns"
						:sort-by="sortBy"
						:sort-order="sortOrder"
					/>
				</thead>
				<tbody>
					<component
						:is="componentDataRow"
						v-for="(row, rowindex) in data"
						:key="rowindex"
						:selectable="selectableRows"
						:rowindex="rowindex"
						:selected="isRowSelected(row)"
						:column-keys="columnKeys"
						:data="row"
						@update:selected="setRowSelection(row, $event)"
					>
						<template
							v-for="(cmp, name) in dataRowSlots"
							v-slot:[name]="{ data: columnData }"
						>
							<slot :name="name" :data="columnData" />
						</template>
					</component>
				</tbody>
			</table>
		</div>

		<pagination
			class="mt--md"
			:current-page="currentPage"
			:total="total"
			:per-page="rowsPerPage"
			@update:per-page="$emit('update:rows-per-page', $event)"
			@update:current-page="$emit('update:current-page', $event)"
		/>
	</div>
</template>

<script>
import { getValueByPath } from "@utils/helpers";

import TableDataRow from "./TableDataRow.vue";
import TableHeadRow from "./TableHeadRow.vue";
import Pagination from "@components/organisms/Pagination.vue";
import FilterMenu from "./FilterMenu.vue";
import RowSelectionBar from "./RowSelectionBar.vue";
import defaultFiltersMixin from "@mixins/defaultFilters";
import { supportedFilterTypes } from "@mixins/defaultFilters";
import { supportedFilterMatchingTypes } from "@mixins/defaultFilters";

export default {
	components: {
		Pagination,
		FilterMenu,
		RowSelectionBar,
	},
	mixins: [defaultFiltersMixin],
	props: {
		columns: {
			type: Array,
			default: () => [],
		},
		data: {
			type: Array,
			default: () => [],
		},
		/**
		 * Defines the path to a unqiue key in the object
		 */
		trackBy: {
			type: String,
			required: true,
		},

		filterable: {
			type: Boolean,
		},
		filters: {
			type: Array,
			default: () => [],
			validator: function(filters) {
				return filters.every((filter) => {
					const hasValidType =
						!!filter.type && supportedFilterTypes.includes(filter.type);

					var hasValidMatchingType = false;

					if (
						!supportedFilterMatchingTypes[filter.type] &&
						!filter.matchingType
					) {
						hasValidMatchingType = true;
					} else if (
						supportedFilterMatchingTypes[filter.type] &&
						filter.matchingType &&
						supportedFilterMatchingTypes[filter.type][filter.matchingType.value]
					) {
						hasValidMatchingType = true;
					} else if (
						filter.matchingType &&
						filter.matchingType.implementation &&
						filter.matchingType.value &&
						filter.matchingType.label
					) {
						hasValidMatchingType = true;
					}

					const isValidSelectFilter =
						filter.value &&
						Array.isArray(filter.value) &&
						filter.value.length > 0 &&
						filter.value.every((value) => value.value && value.label);

					return (
						filter.label &&
						(filter.property || filter.type == "fulltextSearch") &&
						hasValidType &&
						hasValidMatchingType &&
						(isValidSelectFilter || filter.type !== "select")
					);
				});
			},
		},
		filtersSelected: {
			type: Array,
			default: () => [],
		},

		actions: {
			type: Array,
			default: () => [],
		},

		paginated: Boolean,
		/**
		 * The total number of available rows (including not visible items from other pages)
		 */
		total: {
			type: Number,
			default: 0,
		},
		currentPage: {
			type: Number,
			default: 1,
		},
		rowsPerPage: {
			type: Number,
			default: 25,
		},

		/**
		 * enables checkboxes next to each row
		 */
		selectableRows: {
			type: Boolean,
		},
		/**
		 * toggles wheather the selectedRowIds prop (should) contain all selected or all unselected rows
		 * this is a trick to make all rows selectable even if we do not know all items yet.
		 */
		selectionType: {
			type: String,
			default: "inclusive",
			validator: (val) => ["inclusive", "exclusive"].includes(val),
		},
		/**
		 * All identifiers that are located at the trackBy key of the selected/deselected items.
		 * Depending of the selectMode (inclusive/exclusive) this contains the selected or unselected Items
		 */
		selectedRowIds: {
			type: Array,
			default: () => [],
		},

		/**
		 * Component to use for the header. Must define the same Interface as ./TableHeadRow
		 */
		componentHeaderRow: {
			type: Object,
			default: () => TableHeadRow,
		},
		/**
		 * Component to use for each datarow. Must define the same Interface as ./TableDataRow
		 * The default component provides slots for each column with the naming schema dataColumn-[index]
		 */
		componentDataRow: {
			type: Object,
			default: () => TableDataRow,
		},
	},
	data() {
		return {
			editFilterActive: false,
			tableData: this.data,
			filterOpened: {},
			newFiltersSelected: this.filtersSelected,
			selectionKeys: {},
			sortBy: undefined,
			sortOrder: undefined,
		};
	},
	computed: {
		// TODO watch for changes of parent selection and update selectionKeys data
		// selectionKeys() {
		// 	return this.selectedRowIds.reduce((obj) => {
		// 		obj[selectedRowIds] = obj;
		// 		return obj;
		// 	}, {});
		// },
		columnKeys() {
			return this.columns.map((e) => e.field);
		},
		dataRowSlots() {
			return Object.keys(this.$slots).filter((name) => {
				name.startsWith("dataRow");
			});
		},
		// filteredRows() {
		// 	return this.data.filter((row) => {
		// 		return this.newFiltersSelected.every((filter) => {
		// 			if (filter.type === "fulltextSearch") {
		// 				return getNestedObjectValues(row).some((value) =>
		// 					(value.toString() || "").includes(filter.value)
		// 				);
		// 			} else {
		// 				const functionName = camelCase(
		// 					`filter-${filter.type}-${(filter.matchingType || {}).value}`
		// 				);
		// 				const defaultFunctionName = camelCase(
		// 					`filter-${filter.type}-default`
		// 				);
		// 				const filterFunction =
		// 					(filter.matchingType || {}).implementation ||
		// 					this[functionName] ||
		// 					this[defaultFunctionName];
		// 				return filterFunction(
		// 					getValueByPath(row, filter.property),
		// 					filter.value
		// 				);
		// 			}
		// 		});
		// 	});
		// },
		// filteredAndSortedRows() {
		// 	if (
		// 		this.backendSorting ||
		// 		!this.currentSortColumn ||
		// 		!this.currentSortColumn.sortable
		// 	) {
		// 		return this.filteredRows;
		// 	}
		// 	return this.sortBy(
		// 		this.filteredRows,
		// 		this.currentSortColumn.field,
		// 		this.isAsc
		// 	);
		// },
		allRowsOfAllPagesSelected() {
			const selections = Object.keys(this.selectedRowIds);
			return this.selectionType === "exclusive" && selections.length === 0;
		},
		allRowsOfCurrentPageSelected: {
			get() {
				const isInSelection = (row) => this.selectedRowIds[row[this.trackBy]];
				return this.selectionType === "inclusive"
					? Boolean(this.data.every(isInSelection))
					: !Boolean(this.data.some(isInSelection));
			},
			set(state) {
				this.data.forEach((row) => {
					this.setRowSelection(row, state);
				});
			},
		},
	},
	watch: {
		// data(data) {
		// 	this.selectedRowIds = this.selectedRowIds.filter((id) =>
		// 		data.some((row) => row[this.trackBy] === id)
		// 	);
		// 	this.tableData = data;
		// 	if (!this.backendSorting) {
		// 		this.sort(this.currentSortColumn, true);
		// 	}
		// },
		// filtersSelected() {
		// 	this.newFiltersSelected = this.filtersSelected;
		// },
		// newFiltersSelected() {
		// 	this.$emit("update:filters-selected", this.newFiltersSelected);
		// },
		// selectedRowIds(rows) {
		// 	this.selectedRowIds = rows.map((row) => row[this.trackBy]);
		// },
	},
	methods: {
		setRowSelection(row, state) {
			if (this.selectionType === "inclusive") {
				if (state) {
					this.$set(this.selectedRowIds, row[this.trackBy], state);
				} else {
					this.$delete(this.selectedRowIds, row[this.trackBy]);
				}
			} else {
				if (!state) {
					this.$set(this.selectedRowIds, row[this.trackBy], state);
				} else {
					this.$delete(this.selectedRowIds, row[this.trackBy]);
				}
			}
		},
		isRowSelected(row) {
			const rowId = row[this.trackBy];
			return this.selectionType === "inclusive"
				? this.selectionKeys[rowId]
				: !this.selectionKeys[rowId];
		},
		getValueByPath,
		fireAction(action) {
			action.action(this.newselectedRowIds);
			this.unselectAllRowsOfAllPages();
		},

		selectAllRowsOfAllPages() {
			this.$set(this, "selectedRowIds", []);
			this.$emit("update:selectionType", "exclusive");
		},

		unselectAllRowsOfAllPages() {
			this.$set(this, "selectedRowIds", []);
			this.$emit("update:selectionType", "inclusive");
		},
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
}
</style>
