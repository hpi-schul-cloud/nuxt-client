<template>
	<backend-data-table
		v-bind="attrsProxy"
		:data="paginatedSortedData"
		:total="sortedData.length"
		:sort-by.sync="sortByProxy"
		:sort-order.sync="sortOrderProxy"
		:current-page.sync="currentPageProxy"
		:rows-per-page.sync="rowsPerPageProxy"
		:selected-row-ids="backendTableSelectionIds"
		:selection-type="backendTableSelectionType"
		@update:selection="handleTableSelectionUpdate"
		v-on="proxyListeners"
	>
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

import unmanagedSyncPropsMixin from "@mixins/unmanagedSyncProps";

const isArrayIdentical = (a, b) =>
	a.length === b.length && a.every((item) => b.includes(item));

// This list defines all events that should not be proxied to the BackendDataTable.
// This is required for events for which we override the behaviour in this component
// and to prevent duplicate triggering in the parent component.
const eventProxyBlacklist = [
	"update:selection",
	"update:current-page",
	"update:currentPage",
	"update:sort-by",
	"update:sortBy",
	"update:sort-order",
	"update:sortOrder",
	"update:rows-per-page",
	"update:rowsPerPage",
];

const unmanagedSyncProps = {
	sortBy: {
		type: String,
		default: "",
	},
	sortOrder: {
		type: String,
		default: "asc",
		validator: (val) => ["asc", "desc"].includes(val),
	},
	currentPage: {
		type: Number,
		default: 1,
	},
	rowsPerPage: {
		type: Number,
		default: 25,
	},
};

export default {
	components: {
		BackendDataTable,
	},
	mixins: [unmanagedSyncPropsMixin(Object.keys(unmanagedSyncProps))],
	props: {
		// all other props are inherited from the BackendDataTable
		...BackendDataTable.props,
		// props handled by the unmanagedSyncProps mixin
		...unmanagedSyncProps,
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
			backendTableSelectionIds: this.selection,
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
		proxyListeners() {
			return Object.fromEntries(
				Object.entries(this.$listeners).filter(
					([key]) => !eventProxyBlacklist.includes(key)
				)
			);
		},
		sortedData() {
			const raw = this.data;

			if (!this.sortByProxy) {
				return raw;
			}
			const sortMethod = this.sortMethod || this.sort;
			const out = sortMethod(raw, this.sortByProxy, this.sortOrderProxy, {
				getValueByPath,
			});

			return out;
		},
		paginatedSortedData() {
			if (!this.paginated) {
				return this.sortedData;
			}

			const currentPage = this.currentPageProxy;
			const rowsPerPage = this.rowsPerPageProxy;
			return this.sortedData.slice(
				(currentPage - 1) * rowsPerPage,
				currentPage * rowsPerPage
			);
		},
		dataIds() {
			return this.data.map((row) => getValueByPath(row, this.trackBy));
		},
	},
	watch: {
		selection(to) {
			this.handleParentSelectionUpdate(to);
		},
	},
	methods: {
		handleParentSelectionUpdate(selection) {
			if (selection.length === this.data.length) {
				this.$set(this, "backendTableSelectionIds", []);
				this.backendTableSelectionType = "exclusive";
			} else {
				this.$set(this, "backendTableSelectionIds", selection);
				this.backendTableSelectionType = "inclusive";
			}
		},
		handleTableSelectionUpdate(selection, selectionType) {
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
