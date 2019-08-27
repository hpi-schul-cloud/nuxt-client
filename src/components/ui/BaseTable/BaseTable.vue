<!-- eslint-disable max-lines -->

<template>
	<div class="table-outer">
		<div class="table-wrapper">
			<tool-belt
				:actions="actions"
				:filterable="filterable"
				:checked-rows="newCheckedRows"
				:filters="filters"
				:filters-selected="newFiltersSelected"
				:abolute-all-checked="absoluteAllChecked"
				:is-all-checked="isAllChecked"
				:total="total"
				@uncheck-all="uncheckAll"
				@fire-action="fireAction"
				@select-filter="selectFilter"
				@remove-filter="removeFilter"
				@edit-filter="editFilter"
				@set-search="setSearch"
			/>

			<filter-modal
				:active="editFilterActive"
				:filter-opened="filterOpened"
				@set-filter="setFilter"
			/>

			<table class="table">
				<thead>
					<tr>
						<th v-if="checkable" class="checkbox-cell">
							<base-input
								type="checkbox"
								label="check all"
								label-hidden
								:vmodel="isAllChecked"
								name="checkbox"
								@change.native="checkAll"
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
								<div
									v-if="column.sortable"
									:class="{ 'is-desc': !isAsc && currentSortColumn === column }"
								></div>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(row, index) in visibleData"
						:key="index"
						:class="{ checked: isRowChecked(row) }"
						@click.shift="checkRow(row)"
					>
						<td v-if="checkable" class="checkbox-cell">
							<base-input
								type="checkbox"
								:label="'Zeile ' + index"
								label-hidden
								:vmodel="isRowChecked(row)"
								@change.native="checkRow(row)"
								@click.native.stop
							/>
						</td>
						<td v-for="(column, index2) in columns" :key="index2">
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
			:total="newDataTotal"
			:per-page="perPage"
			@update:per-page="$emit('update:per-page', $event)"
			@update:current-page="$emit('update:current-page', $event)"
		/>
	</div>
</template>

<script>
import { getValueByPath, indexOf } from "@utils/helpers";
import Pagination from "@components/Pagination.vue";
import ToolBelt from "./ToolBelt.vue";
import FilterModal from "./FilterModal.vue";

export default {
	components: {
		Pagination,
		ToolBelt,
		FilterModal,
	},
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		filters: {
			type: Array,
			default: () => [],
		},
		filtersSelected: {
			type: Array,
			default: () => [],
		},
		filterable: {
			type: Boolean,
		},
		actions: {
			type: Array,
			default: () => [],
		},
		checkable: {
			type: Boolean,
		},
		checkedRows: {
			type: Array,
			default: () => [],
		},
		columns: {
			type: Array,
			default: () => [],
		},
		loading: Boolean,
		paginated: {
			type: Boolean,
		},
		currentPage: {
			type: Number,
			default: 1,
		},
		perPage: {
			type: Number,
			default: 10,
		},
		total: {
			type: Number,
			default: 0,
		},
		backendPagination: {
			type: Boolean,
		},
		backendSorting: {
			type: Boolean,
		},
		skip: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			editFilterActive: false,
			currentSortColumn: "",
			newData: this.data,
			newDataTotal: this.backendPagination ? this.total : this.data.length,
			absoluteAllChecked: false,
			filterOpened: {},
			newFiltersSelected: [],
			newCheckedRows: [...this.checkedRows],
			isAsc: false,
			defaultSort: [String, Array],
			defaultSortDirection: {
				type: String,
				default: "asc",
			},
		};
	},
	computed: {
		/**
		 * Check if all rows in the page are checked.
		 */
		isAllChecked() {
			const isAllChecked = this.visibleData.some((currentVisibleRow) => {
				return indexOf(this.newCheckedRows, currentVisibleRow) < 0;
			});
			return !isAllChecked;
		},
		visibleData() {
			if (!this.paginated) return this.newData;

			const { currentPage } = this;
			const { perPage } = this;
			if (this.newData.length <= perPage || perPage < 0) {
				return this.newData;
			} else {
				const start = (currentPage - 1) * perPage;
				const end = parseInt(start, 10) + parseInt(perPage, 10);
				return this.newData.slice(start, end);
			}
		},
	},
	watch: {
		checkedRows(rows) {
			this.newCheckedRows = [...rows];
		},
		data(data) {
			this.newData = data;

			if (!this.backendSorting) {
				this.sort(this.currentSortColumn, true);
			}
			if (!this.backendPagination) {
				this.newDataTotal = data.length;
			}
		},
		total(newTotal) {
			if (!this.backendPagination) return;
			this.newDataTotal = newTotal;
		},
		newFiltersSelected() {
			this.$emit("update:filters-selected", this.newFiltersSelected);
		},
	},
	methods: {
		getValueByPath,
		setSearch(val) {
			if (this.newFiltersSelected.some((f) => f.label === "Volltextsuche")) {
				this.newFiltersSelected = this.newFiltersSelected.map((f) => {
					if (f.label === "Volltextsuche") {
						f.value = val;
						f.tagLabel = "Volltextsuche nach: " + val;
					}
					return f;
				});
			} else {
				this.setFilter({
					label: "Volltextsuche",
					tagLabel: "Volltextsuche nach: " + val,
					type: "regex",
					value: val,
				});
			}
		},
		fireAction(item) {
			item.action(this.newCheckedRows);
			this.uncheckAll();
		},
		editFilter(filter) {
			this.editFilterActive = true;
			this.filterOpened = filter;
		},
		removeFilter(filter) {
			this.newFiltersSelected.splice(
				this.newFiltersSelected.indexOf(filter),
				1
			);
		},
		selectFilter(filter) {
			this.$set(filter, "selected", true);
			this.filterOpened = filter;
			this.editFilterActive = true;
		},
		setFilter(filterData) {
			const isNewFilter = !this.newFiltersSelected.some(
				(f) => f.label === filterData.label
			);

			const filter = isNewFilter
				? JSON.parse(JSON.stringify(filterData))
				: filterData;

			if (filter.type === "string") {
				filter.tagLabel = `${filter.label} ${filter.matchingType.label} ${filter.value}`;
			} else if (filter.type === "regex") {
				filter.tagLabel = `${filter.label} nach: ${filter.value}`;
			} else if (filter.type === "select") {
				filter.tagLabel = filter.label + ": ";
				if (filter.multiple) {
					let activeOptions = filter.options.filter((f) => f.checked);
					activeOptions = activeOptions.map((f) => f.label);
					filter.tagLabel += activeOptions.join(", ");
				}
			}

			if (isNewFilter) {
				this.newFiltersSelected.push(filter);
			} else {
				this.newFiltersSelected = this.newFiltersSelected.map((f) => {
					if (f.label === filter.label) {
						f.value = filter.value;
					}
					return f;
				});
			}
			this.filterOpened = {};
			this.editFilterActive = false;
		},
		/**
		 * Initial sorted column based on the default-sort prop.
		 */
		initSort() {
			if (!this.defaultSort) return;
			let sortField = "";
			let sortDirection = this.defaultSortDirection;
			if (Array.isArray(this.defaultSort)) {
				sortField = this.defaultSort[0];
				if (this.defaultSort[1]) {
					sortDirection = this.defaultSort[1];
				}
			} else {
				sortField = this.defaultSort;
			}
			this.newColumns.forEach((column) => {
				if (column.field === sortField) {
					this.isAsc = sortDirection.toLowerCase() !== "desc";
					this.sort(column, true);
				}
			});
		},
		sort(column) {
			if (!column || !column.sortable) return;

			this.isAsc = column === this.currentSortColumn ? !this.isAsc : "desc";

			this.$emit("sort", column.field, this.isAsc ? "asc" : "desc");

			if (!this.backendSorting) {
				this.newData = this.sortBy(this.newData, column.field, this.isAsc);
			}

			this.currentSortColumn = column;
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

		/**
		 * Check if the row is checked (is added to the array).
		 */
		isRowChecked(row) {
			return indexOf(this.newCheckedRows, row) >= 0;
		},

		/**
		 * Remove a checked row from the array.
		 */
		removeCheckedRow(row) {
			const index = indexOf(this.newCheckedRows, row);
			if (index >= 0) {
				this.newCheckedRows.splice(index, 1);
			}
		},

		/**
		 * Header checkbox click listener.
		 * Add or remove all rows in current page.
		 */
		uncheckAll() {
			this.absoluteAllChecked = false;
			this.visibleData.forEach((currentRow) => {
				this.removeCheckedRow(currentRow);
			});
			this.$emit("check", this.newCheckedRows);
			this.$emit("check-all", this.newCheckedRows);
			// Emit checked rows to update user variable
			this.$emit("update:checkedRows", this.newCheckedRows);
		},

		/**
		 * Header checkbox click listener.
		 * Add or remove all rows in current page.
		 */
		checkAll() {
			const { isAllChecked } = this;
			this.absoluteAllChecked = false;
			this.visibleData.forEach((currentRow) => {
				this.removeCheckedRow(currentRow);
				if (!isAllChecked) {
					this.newCheckedRows.push(currentRow);
				}
			});
			this.$emit("check", this.newCheckedRows);
			this.$emit("check-all", this.newCheckedRows);
			// Emit checked rows to update user variable
			this.$emit("update:checkedRows", this.newCheckedRows);
		},

		/**
		 * Row checkbox click listener.
		 * Add or remove a single row.
		 */
		checkRow(row) {
			this.absoluteAllChecked = false;
			if (!this.isRowChecked(row)) {
				this.newCheckedRows.push(row);
			} else {
				this.removeCheckedRow(row);
			}
			this.$emit("check", this.newCheckedRows, row);
			// Emit checked rows to update user variable
			this.$emit("update:checkedRows", this.newCheckedRows);
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
	.filters {
		display: flex;
		flex-flow: row;
		align-items: center;
		.wrapper {
			margin-bottom: 0;
		}
	}
	.check-info {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: var(--space-md);
		color: var(--color-white);
		background: var(--color-info-light);
	}
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
				.arrow {
					display: inline-block;
					width: 0;
					height: 0;
					margin-left: var(--space-xxs);
					vertical-align: middle;
					border-right: 4px solid transparent;
					border-bottom: 4px solid var(--color-gray);
					border-left: 4px solid transparent;
					&.is-desc {
						border-top: 4px solid var(--color-gray);
						border-right: 4px solid transparent;
						border-bottom: 0;
						border-left: 4px solid transparent;
					}
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
			&.checked {
				background-color: var(--color-info-light);
			}
			td {
				padding: var(--space-xs);
			}
		}
	}
}
</style>
