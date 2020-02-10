<template>
	<backend-data-table
		v-bind="attrsProxy"
		:data="paginatedSortedData"
		:total="sortedData.length"
		:sort-by.sync="sortByProxy"
		:sort-order.sync="sortOrderProxy"
		v-on="$listeners"
	>
		<!-- TODO pass through all slots -->
	</backend-data-table>
</template>
<script>
import { getValueByPath } from "@utils/helpers";
import BackendDataTable from "./BackendDataTable";

export default {
	components: {
		BackendDataTable,
	},
	props: {
		/**
		 * (data, sortBy, sortOrder) => sortedData
		 */
		sortMethod: {
			type: Function,
			default: undefined,
		},
		// all other props are inherited from the BackendDataTable
		...BackendDataTable.props,
	},
	data() {
		return {
			localSortBy: undefined,
			localSortOrder: undefined,
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
			// TODO should sort the data according to the selection
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
			const { currentPage, rowsPerPage } = this;
			return this.sortedData.slice(
				(currentPage - 1) * rowsPerPage,
				currentPage * rowsPerPage
			);
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
	},
	watch: {
		sortBy(to) {
			if (to !== this.localSortBy) {
				this.localSortBy = to;
			}
		},
		sortOrder(to) {
			if (to !== this.localSortOrder) {
				this.localSortOrder = to;
			}
		},
	},
	methods: {
		sort(data, sortBy, sortOrder) {
			const sortedData = [...data].sort((first, second) => {
				const a = getValueByPath(first, sortBy);
				const b = getValueByPath(second, sortBy);
				// handle undefined values
				if (!a) {
					return -1;
				}
				if (!b) {
					return 1;
				}

				// sort numbers
				if (!isNaN(a) && !isNaN(b)) {
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
	/**
	 * TODO: simplfy API of BackendDataTable a bit to hide the selectionType invert stuff
	 * that is required if we do not know all data beforehand. We don't have this case here
	 * so we should provide a simlified API that always includes all items.
	 */
};
</script>
