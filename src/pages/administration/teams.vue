<template>
	<section class="section">
		<h1>Teams Verwaltung</h1>
		<base-table
			v-if="pagination && pagination.total > 0"
			v-slot:default="slotProps"
			backend-pagination
			backend-sorting
			:columns="columns"
			:data="data"
			paginated
			:current-page="pagination.skip"
			track-by="id"
			@sort="onSort"
			@update:current-page="onPageChange"
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
	layout: "loggedInFull",
	data: () => ({
		total: 0,
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
