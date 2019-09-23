<template>
	<section class="section">
		<h1>Teams Verwaltung</h1>
		<base-table
			v-if="pagination && pagination.total > 0"
			v-slot:default="slotProps"
			:data="data"
			paginated
			:skip="pagination.skip"
			:pagination-state="pagination"
			:columns="columns"
			:default-sort="[sortField, sortOrder]"
			default-sort-direction="asc"
			backend-sorting
			backend-pagination
			@sort="onSort"
			@update:skip="onPageChange"
		>
			<base-icon
				source="material"
				icon="delete"
				class="cursor-pointer"
				@click.native="deleteTeam(slotProps._id)"
			/>
		</base-table>
	</section>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
	data: () => ({
		total: 0,
		loading: false,
		sortField: "createdAt",
		sortOrder: "asc",
		defaultSortOrder: "asc",
		page: 1,
		perPage: 20,
		columns: [
			{
				field: "name",
				label: "Name",
				sortable: true,
			},
			{
				field: "createdAt",
				label: "Erstellt am",
			},
		],
	}),
	computed: {
		...mapState("teams", {
			pagination: (state) => state.pagination.default,
		}),
		...mapGetters("teams", {
			data: "list",
		}),
	},
	created() {
		this.find();
	},
	methods: {
		find() {
			const query = {
				$limit: 3,
				$skip: this.skip || 0,
				$sort: {},
				// $skip: 25 * (this.pagination.currentPage - 1),
				// $sort: {
				//     createdAt: -1,
				// },
			};

			if (this.sortField) {
				query.$sort[this.sortField] = this.sortOrder === "asc" ? 1 : -1;
			}

			this.$store.dispatch("teams/find", {
				query,
			});
		},
		onPageChange(skip) {
			this.skip = skip;
			this.find();
		},
		onSort(field, order) {
			this.sortField = field;
			this.sortOrder = order;
			this.find();
		},
	},
};
</script>
