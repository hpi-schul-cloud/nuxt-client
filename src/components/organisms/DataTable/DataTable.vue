<template>
	<backend-data-table
		v-bind="$attrs"
		:data="paginatedSortedData"
		v-on="$listeners"
	>
		<!-- TODO pass through all slots -->
	</backend-data-table>
</template>
<script>
import BackendDataTable from "./BackendDataTable";

export default {
	components: {
		BackendDataTable,
	},
	computed: {
		sortedData() {
			// TODO should sort the data according to the selection
			return this.$attrs.data;
		},
		paginatedSortedData() {
			if (!this.$attrs.paginated) {
				return this.sortedData;
			}
			const currentPage = this.$attrs["current-page"];
			const rowsPerPage = this.$attrs["rows-per-page"];
			return this.sortedData.slice(
				(currentPage - 1) * rowsPerPage,
				currentPage * rowsPerPage
			);
		},
	},
	/**
	 * TODO: simplfy API of BackendDataTable a bit to hide the selectionType invert stuff
	 * that is required if we do not know all data beforehand. We don't have this case here
	 * so we should provide a simlified API that always includes all items.
	 */
};
</script>
