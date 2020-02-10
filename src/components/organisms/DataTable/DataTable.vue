<template>
	<backend-data-table
		v-bind="attrsProxy"
		:data="paginatedSortedData"
		:total="sortedData.length"
		:sort-by.sync="localSortBy"
		:sort-order.sync="localSortOrder"
		v-on="$listeners"
	>
		<!-- TODO pass through all slots -->
	</backend-data-table>
</template>
<script>
import { getValueByPath } from "@utils/helpers";
import BackendDataTable from "./BackendDataTable";

const sortData = (data, sortBy, sortOrder) => {
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
};

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
			default: sortData,
		},
		// all other props are inherited from the BackendDataTable
		...BackendDataTable.props,
	},
	data() {
		return {
			localSortBy: this.sortBy,
			localSortOrder: this.sortOrder,
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

			if (!this.sortBy) {
				return raw;
			}
			return this.sortMethod(raw, this.localSortBy, this.localSortOrder);
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
	},
	watch: {
		// use this complicated sync/proxy method to work even when props are not specified and synced (local first)
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
		localSortBy(to) {
			if (to !== this.sortBy) {
				/**
				 * helper event for the sortBy .sync modifier
				 */
				this.$emit("update:sortBy", to);
			}
		},
		localSortOrder(to) {
			if (to !== this.sortOrder) {
				/**
				 * helper event for the sortOrder .sync modifier
				 */
				this.$emit("update:sortOrder", to);
			}
		},
	},
	/**
	 * TODO: simplfy API of BackendDataTable a bit to hide the selectionType invert stuff
	 * that is required if we do not know all data beforehand. We don't have this case here
	 * so we should provide a simlified API that always includes all items.
	 */
};
</script>
