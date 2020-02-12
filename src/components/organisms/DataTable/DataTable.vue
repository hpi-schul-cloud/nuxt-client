<template>
	<backend-data-table
		v-bind="attrsProxy"
		:data="paginatedSortedData"
		:total="sortedData.length"
		:sort-by.sync="sortByProxy"
		:sort-order.sync="sortOrderProxy"
		:current-page.sync="currentPageProxy"
		:rows-per-page.sync="rowsPerPageProxy"
		:selected-row-ids="backendTableSelection"
		:selection-type="backendTableSelectionType"
		@update:selection="handleTableSelectionUpdate"
		v-on="$listeners"
	>
		<template v-for="(cmp, name) in $slots" v-slot:[name]>
			<slot :name="name">
				<component :is="cmp.context" :key="name" />
			</slot>
		</template>
		<template v-for="(cmp, name) in $scopedSlots" v-slot:[name]="props">
			<slot :name="name" v-bind="props">
				<component :is="cmp.context" :key="name" />
			</slot>
		</template>
	</backend-data-table>
</template>
<script>
import { getValueByPath } from "@utils/helpers";
import BackendDataTable from "./BackendDataTable";

const isArrayIdentical = (a, b) =>
	a.length === b.length && a.every((item) => b.includes(item));

export default {
	components: {
		BackendDataTable,
	},
	props: {
		// all other props are inherited from the BackendDataTable
		...BackendDataTable.props,
		/**
		 * (data, sortBy, sortOrder) => sortedData
		 */
		sortMethod: {
			type: Function,
			default: undefined,
		},
		/**
		 * Array of RowIds (trackBy) that should be selected.
		 * Works with the .sync modifier.
		 */
		selection: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			localSortBy: undefined,
			localSortOrder: undefined,
			localCurrentPage: undefined,
			localRowsPerPage: undefined,
			backendTableSelection: this.selection,
			backendTableSelectionType: "inclusive",
		};
	},
	computed: {
		attrsProxy() {
			return {
				...this.$props,
				...this.$attrs,
			};
		},
		sortedData() {
			const raw = this.data;

			if (!this.sortByProxy) {
				return raw;
			}
			const sortMethod = this.sortmethod || this.sort;
			const out = sortMethod(raw, this.sortByProxy, this.sortOrderProxy);

			return out;
		},
		paginatedSortedData() {
			if (!this.paginated) {
				return this.sortedData;
			}
			const {
				currentPageProxy: currentPage,
				rowsPerPageProxy: rowsPerPage,
			} = this;
			return this.sortedData.slice(
				(currentPage - 1) * rowsPerPage,
				currentPage * rowsPerPage
			);
		},
		currentPageProxy: {
			get() {
				return this.localCurrentPage || this.currentPage;
			},
			set(to) {
				this.localCurrentPage = to;
				this.$emit("update:currentPage", to);
			},
		},
		rowsPerPageProxy: {
			get() {
				return this.localRowsPerPage || this.rowsPerPage;
			},
			set(to) {
				this.localRowsPerPage = to;
				this.$emit("update:rows-per-page", to);
			},
		},
		sortByProxy: {
			get() {
				return this.localSortBy || this.sortBy;
			},
			set(to) {
				this.localSortBy = to;
				this.$emit("update:sortBy", to);
			},
		},
		sortOrderProxy: {
			get() {
				return this.localSortOrder || this.sortOrder;
			},
			set(to) {
				this.localSortOrder = to;
				this.$emit("update:sortOrder", to);
			},
		},
		dataIds() {
			return this.data.map((row) => getValueByPath(row, this.trackBy));
		},
	},
	watch: {
		currentPage(to) {
			this.localCurrentPage = to;
		},
		rowsPerPage(to) {
			this.localRowsPerPage = to;
		},
		sortBy(to) {
			this.localSortBy = to;
		},
		sortOrder(to) {
			this.localSortOrder = to;
		},
		selection(to) {
			this.handleParentSelectionUpdate(to);
		},
		data() {
			this.validateData();
		},
	},
	created() {
		this.validateData();
	},
	methods: {
		validateData() {
			const isValid = this.data.every(
				(row) => typeof getValueByPath(row, this.trackBy) === "string"
			);
			if (!isValid) {
				throw new Error(`provided dataset is invalid`);
			}
		},
		handleParentSelectionUpdate(selection) {
			if (selection.length === this.data.length) {
				this.$set(this, "backendTableSelection", []);
				this.backendTableSelectionType = "exclusive";
			} else {
				this.$set(this, "backendTableSelection", selection);
				this.backendTableSelectionType = "inclusive";
			}
		},
		handleTableSelectionUpdate(selection, selectionType, initiator) {
			const newSelection = this.dataIds.filter((rowId) => {
				return selectionType === "exclusive"
					? !selection.includes(rowId)
					: selection.includes(rowId);
			});
			if (!isArrayIdentical(newSelection, this.selection)) {
				this.$emit("update:selection", newSelection);
			}
		},
		sort(data, sortBy, sortOrder) {
			const sortedData = [...data].sort((first, second) => {
				const a = getValueByPath(first, sortBy);
				const b = getValueByPath(second, sortBy);
				// handle undefined values
				if (a === undefined || a === null) {
					return 1;
				}
				if (b === undefined || b === null) {
					return -1;
				}

				// sort numbers
				if (typeof a === "number" && typeof b === "number") {
					return a - b;
				}

				// sort booleans
				if (typeof a === "boolean" && typeof b === "boolean") {
					return a === b ? 0 : a ? -1 : 1;
				}

				// sort strings
				return a.localeCompare(b);
			});
			return sortOrder !== "desc" ? sortedData : sortedData.reverse();
		},
	},
};
</script>
