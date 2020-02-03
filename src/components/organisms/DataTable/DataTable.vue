<template>
	<backend-data-table v-bind="$attrs" :data="paginatedData" v-on="$listeners">
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
		paginatedData() {
			if (!this.$attrs.paginated) {
				return this.$attrs.data;
			}
			const currentPage = this.$attrs["current-page"];
			const rowsPerPage = this.$attrs["rows-per-page"];
			return this.$attrs.data.slice(
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
