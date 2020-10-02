<!-- eslint-disable max-lines -->
<template>
	<div class="table-outer">
		<div class="table-wrapper">
			<div class="toolbelt">
				<row-selection-bar
					ref="rowSelectionBar"
					:actions="actions"
					:all-rows-of-all-pages-selected.sync="allRowsOfAllPagesSelected"
					:number-of-selected-items="numberOfSelectedItems"
					:total-number-of-items="total"
					@fire-action="fireAction"
				/>
			</div>
			<div class="table-content-wrapper">
				<table class="table">
					<thead>
						<component
							:is="componentHeaderRow"
							:all-rows-selectable="rowsSelectable"
							:current-page-selection-state.sync="currentPageSelectionState"
							:columns="columns"
							:sort-by.sync="$_controllableDataSortBy"
							:sort-order.sync="$_controllableDataSortOrder"
							data-testid="table-data-head"
							:show-external-text="showExternalText"
							@update:sort="onUpdateSort"
						>
							<template
								v-for="(cmp, name) in dataHeadSlots"
								v-slot:[name]="columnProps"
							>
								<slot :name="name" v-bind="columnProps" />
							</template>
						</component>
					</thead>
					<tbody data-testid="table-data-body">
						<component
							:is="componentDataRow"
							v-for="(row, rowindex) in data"
							:key="getValueByPath(row, trackBy)"
							:selectable="rowsSelectable"
							:rowindex="rowindex"
							:selected="isRowSelected(row)"
							:column-keys="columnKeys"
							:data="row"
							data-testid="table-data-row"
							@update:selected="setRowSelection(row, $event)"
						>
							<template
								v-for="(cmp, name) in dataRowSlots"
								v-slot:[name]="columnProps"
							>
								<slot :name="name" v-bind="columnProps" />
							</template>
						</component>
					</tbody>
				</table>
			</div>
		</div>

		<pagination
			v-if="paginated"
			class="mt--md"
			:current-page="currentPage"
			:total="total"
			:per-page="rowsPerPage"
			@update:per-page="onUpdateRowsPerPage"
			@update:current-page="$emit('update:current-page', $event)"
		/>
	</div>
</template>

<script>
import { getValueByPath } from "@utils/helpers";

import TableDataRow from "./TableDataRow.vue";
import TableHeadRow from "./TableHeadRow.vue";
import Pagination from "@components/organisms/Pagination.vue";
import RowSelectionBar from "./RowSelectionBar.vue";

import controllableData from "@mixins/controllableData";

export default {
	components: {
		Pagination,
		RowSelectionBar,
	},
	mixins: [controllableData(["sortBy", "sortOrder", "selectionType"])],
	props: {
		/**
		 * Defines the visible columns
		 * `{ label, field?, sortable? }` (? indicates optional fields)
		 */
		columns: {
			type: Array,
			default: () => [],
			validator: (columns) =>
				columns.every((column) => typeof column.label === "string"),
		},
		/**
		 * Array of objects
		 */
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

		/**
		 * should the data be displayed paginated?
		 */
		paginated: Boolean,
		/**
		 * The total number of available rows (including not visible items from other pages)
		 */
		total: {
			type: Number,
			default: 0,
		},
		/**
		 * index of the current page. The first page is 1
		 */
		currentPage: {
			type: Number,
			default: 1,
		},
		/**
		 * items per page to show
		 */
		rowsPerPage: {
			type: Number,
			default: 25,
		},

		/**
		 * enables checkboxes next to each row
		 */
		rowsSelectable: {
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
		 * Array of Objects.
		 * Each Object must define a function "action" that will be called with the list of current selectionIds and the selectionType.
		 * Will be passed to the @components/organisms/DropdownMenu component.
		 */
		actions: {
			type: Array,
			default: () => [],
		},

		sortBy: {
			type: String,
			default: "",
		},
		sortOrder: {
			type: String,
			default: "asc",
			validator: (val) => ["asc", "desc"].includes(val),
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
		showExternalText: {
			type: Boolean,
		},
	},
	data() {
		return {
			editFilterActive: false,
			tableData: this.data,
			selectionKeys: {},
		};
	},
	computed: {
		columnKeys() {
			return this.columns.map((e) => e.field);
		},
		dataRowSlots() {
			return Object.fromEntries(
				Object.entries(this.$scopedSlots).filter(([name]) =>
					name.startsWith("datacolumn")
				)
			);
		},
		dataHeadSlots() {
			return Object.fromEntries(
				Object.entries(this.$scopedSlots).filter(([name]) =>
					name.startsWith("headcolumn")
				)
			);
		},

		numberOfSelectedItems() {
			// TODO think about moving selections outside this method
			const selections = Object.keys(this.selectionKeys);
			return this.$_controllableDataSelectionType === "inclusive"
				? selections.length
				: this.total - selections.length;
		},
		allRowsOfAllPagesSelected: {
			get() {
				// TODO think about moving selections outside this method
				const selections = Object.keys(this.selectionKeys);
				return (
					this.$_controllableDataSelectionType === "exclusive" &&
					selections.length === 0
				);
			},
			set(state) {
				state
					? this.selectAllRowsOfAllPages()
					: this.unselectAllRowsOfAllPages();
			},
		},
		currentPageSelectionState: {
			get() {
				const isInSelection = (row) =>
					this.selectionKeys[getValueByPath(row, this.trackBy)];

				const allSelected =
					this.$_controllableDataSelectionType === "inclusive"
						? Boolean(this.data.every(isInSelection))
						: !Boolean(this.data.some(isInSelection));
				if (allSelected) {
					return "all";
				}

				const someSelected =
					this.$_controllableDataSelectionType === "inclusive"
						? Boolean(this.data.some(isInSelection))
						: !Boolean(this.data.every(isInSelection));
				if (someSelected) {
					return "some";
				}

				return "none";
			},
			set(state) {
				const newState = { all: true, none: false }[state];
				if (newState === undefined) {
					return;
				}
				this.data.forEach((row) => {
					this.setRowSelection(row, newState);
				});
			},
		},
		allRowsOfCurrentPageSelected: {
			get() {
				return this.currentPageSelectionState === "all";
			},
			set(state) {
				if (state === true) {
					return this.currentPageSelectionState === "all";
				} else if (state === false) {
					return this.currentPageSelectionState === "none";
				}
			},
		},
	},
	watch: {
		selectionKeys(to) {
			/**
			 * toggle whenever the selection changes
			 *
			 * @event update:selection
			 * @property {array} selectedRowIds identifiers (trackBy value) of all selected items
			 * @property {string} selectionType is the selection Array "inclusive" or "exclusive".
			 * Inclusive means all items in the passed array are selected.
			 * Exclusive means all items not in the passed array are selected.
			 */
			this.$emit(
				"update:selection",
				Object.keys(to),
				this.$_controllableDataSelectionType
			);
			/**
			 * helper event for the selectedRowIds .sync modifier
			 */
			this.$emit("update:selectedRowIds", Object.keys(to));
		},
		selectedRowIds: {
			handler(to) {
				const isArrayIdentical = (a, b) =>
					a.length === b.length && a.every((c, i) => c === b[i]);
				if (isArrayIdentical(to, Object.keys(this.selectionKeys))) {
					// nothing to change
					return;
				}
				const newSelectionKeys = to.reduce((obj, key) => {
					obj[key] = true;
					return obj;
				}, {});
				this.$set(this, "selectionKeys", newSelectionKeys);
				this.$forceUpdate();
			},
			immediate: true,
		},
		currentPage(to, from) {
			if (to !== from) {
				window.scrollTo({ top: 0, behavior: "smooth" });
			}
		},
	},
	methods: {
		getValueByPath,
		selectAllRowsOfAllPages() {
			this.$set(this, "selectionKeys", {});
			this.$_controllableDataSelectionType = "exclusive";
		},
		unselectAllRowsOfAllPages() {
			this.$set(this, "selectionKeys", {});
			this.$_controllableDataSelectionType = "inclusive";
		},
		setRowSelection(row, state) {
			const method = (newState) => (newState ? "$set" : "$delete");
			this[
				method(
					this.$_controllableDataSelectionType === "inclusive" ? state : !state
				)
			](this.selectionKeys, getValueByPath(row, this.trackBy), true);
		},
		isRowSelected(row) {
			const rowId = getValueByPath(row, this.trackBy);
			return Boolean(
				this.$_controllableDataSelectionType === "inclusive"
					? this.selectionKeys[rowId]
					: !this.selectionKeys[rowId]
			);
		},
		onUpdateSort(sortBy, sortOrder) {
			this.$emit("update:sort", sortBy, sortOrder);
		},
		onUpdateRowsPerPage(value) {
			this.$emit("update:current-page", 1);
			this.$emit("update:rows-per-page", value);
		},
		fireAction(action) {
			const selections = Object.keys(this.selectionKeys);
			action.action(selections, this.$_controllableDataSelectionType);
			this.unselectAllRowsOfAllPages();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
thead,
tbody {
	font-size: var(--text-md);
}
.table-content-wrapper {
	overflow-x: auto;
}
.toolbelt {
	display: flex;
	align-items: center;
	// min-height to prevent table jumping if toolbelt appears/disappears
	min-height: 58px;
}
.table {
	width: 100%;
	margin-bottom: var(--space-sm);
	border-collapse: collapse;
}
</style>
