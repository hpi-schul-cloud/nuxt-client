<!-- eslint-disable max-lines -->

<script>
import Vue from "vue";
import { getValueByPath, indexOf } from "@utils/helpers";
import Pagination from "@components/Pagination.vue";
import DropdownMenu from "@components/DropdownMenu.vue";

export default {
	components: {
		DropdownMenu,
		Pagination,
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
			getValueByPath,
			currentSortColumn: "",
			newData: this.data,
			absoluteAllChecked: false,
			filterOpened: {},
			newFiltersSelected: [],
			stringFilters: [
				{
					label: "enthält",
					value: "contains",
				},
				{
					label: "ist gleich",
					value: "equals",
				},
			],
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

			if (this.backendPagination) {
				return this.newData;
			} else {
				return this.newData.slice(
					this.skip,
					this.paginationState.limit + this.skip
				);
			}
		},
	},
	watch: {
		checkedRows(rows) {
			this.newCheckedRows = [...rows];
		},
		data(data) {
			this.newData = data;
		},
		newFiltersSelected() {
			this.$emit("update:filters-selected", this.newFiltersSelected);
		},
	},
	methods: {
		editFilter(filter) {
			this.newFiltersSelected = filter;
		},
		removeFilter(filter) {
			this.newFiltersSelected.splice(
				this.newFiltersSelected.indexOf(filter),
				1
			);
		},
		selectFilter(filter) {
			Vue.set(filter, "selected", true);
			this.filterOpened = filter;
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
			}
			this.filterOpened = {};
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

<template>
	<div class="table-outer">
		<div class="table-wrapper">
			<div class="toolbelt">
				<div v-if="filterable && newCheckedRows.length < 1" class="filters">
					<base-icon
						icon="filter_list"
						source="material"
						class="ml--md mr--md"
					/>
					<base-select
						:value="newFiltersSelected"
						:options="filters"
						placeholder="Filter hinzufügen"
						:allow-empty="false"
						:multiple="true"
						option-label="label"
						@select="selectFilter"
					>
						<template v-slot:tag="slotProps">
							<span class="multiselect__tag">
								<span @mousedown.prevent="editFilter(slotProps.option)">{{
									slotProps.option.tagLabel
								}}</span>
								<i
									aria-hidden="true"
									tabindex="1"
									class="multiselect__tag-icon"
									@keypress.enter.prevent="removeFilter(slotProps.option)"
									@mousedown.prevent="removeFilter(slotProps.option)"
								></i>
							</span>
						</template>
					</base-select>
				</div>
				<div v-if="newCheckedRows.length > 0" class="check-info">
					<div class="d-flex align-items-center">
						<div v-if="absoluteAllChecked">Alle {{ total }} ausgewählt</div>
						<div v-else>
							<span>{{ newCheckedRows.length }} ausgewählt</span>
							<span v-if="isAllChecked">
								(oder
								<span
									style="text-decoration: underline; cursor: pointer"
									@click="absoluteAllChecked = true"
									>Alle {{ total }} auswählen</span
								>
								)
							</span>
						</div>
						<div class="ml--md">
							<dropdown-menu :items="actions" title="Aktionen">
								<ul>
									<li>Einladung versenden</li>
								</ul>
							</dropdown-menu>
						</div>
					</div>
					<div>
						<base-icon
							icon="close"
							source="material"
							class="ml--md mr--md"
							style="cursor: pointer"
							@click="uncheckAll"
						/>
					</div>
				</div>
			</div>

			<base-modal v-if="filterOpened" :active.sync="!!filterOpened.label">
				<div class="modal-header">
					<h3>{{ filterOpened.label }}</h3>
				</div>

				<div class="modal-body">
					<div v-if="filterOpened.type === 'string'">
						<base-select
							v-model="filterOpened.matchingType"
							:options="stringFilters"
							:allow-empty="false"
							option-label="label"
						></base-select>
						<base-input
							v-model="filterOpened.value"
							placeholder="Wert"
							type="text"
							@keyup.enter.native="setFilter(filterOpened)"
						/>
					</div>
					<div v-if="filterOpened.type === 'select'">
						<h5>Stimmt überein mit:</h5>
						<base-input
							v-for="option of filterOpened.options"
							:key="option.value"
							v-model="option.checked"
							class="mt--sm"
							style="display: block"
							:label="option.label"
							type="checkbox"
							name="checkbox"
						/>
					</div>
				</div>

				<div class="modal-footer">
					<base-button
						id="button"
						design="primary"
						@click="setFilter(filterOpened)"
						>Übernehmen</base-button
					>
				</div>
			</base-modal>

			<table class="table">
				<thead>
					<tr>
						<th v-if="checkable" class="checkbox-cell">
							<base-input
								type="checkbox"
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
					<tr v-for="(row, index) in visibleData" :key="index">
						<td v-if="checkable" class="checkbox-cell">
							<base-input
								type="checkbox"
								:vmodel="isRowChecked(row)"
								@change.native="checkRow(row)"
								@click.native.stop
							/>
						</td>
						<td v-for="(column, index2) in columns" :key="index2">{{
							getValueByPath(row, column.field)
						}}</td>
						<td>
							<slot :row="row"></slot>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<pagination
			class="mt--md"
			:current-page="currentPage"
			:total="backendPagination ? total : newData.length"
			:per-page="perPage"
			@update:current-page="$emit('update:current-page', $event)"
		/>
	</div>
</template>

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
			td {
				padding: var(--space-xs);
			}
		}
	}
}
</style>
