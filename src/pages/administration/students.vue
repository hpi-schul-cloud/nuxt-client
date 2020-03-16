<template>
	<section class="section">
		<h1>xxx</h1>
		<div v-for="element in students" :key="element._id">
			{{ element.firstName }}, {{ element.lastName }}
		</div>
		<pagination
			class="mt--xl-3"
			:current-page="page"
			:per-page="pagination.limit"
			:total="pagination.total"
			@update:current-page="onPageChange"
			@update:per-page="onCurrentPageChange"
		/>
	</section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Pagination from "@components/organisms/Pagination";

export default {
	layout: "loggedInFull",
	components: {
		Pagination,
	},
	data() {
		return {
			page: 1,
			limit:
				localStorage.getItem(
					"pages.administration.students.index.itemsPerPage"
				) || 10,
		};
	},
	computed: {
		...mapGetters("users", {
			students: "list",
		}),
		...mapState("users", {
			pagination: (state) =>
				state.pagination.default || { limit: 10, total: 0 },
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			const query = {
				$limit: this.limit,
				$skip: (this.page - 1) * this.limit,
			};

			this.$store.dispatch("users/findStudents", {
				query,
			});
		},
		onPageChange(page) {
			this.page = page;
			this.find();
		},
		onCurrentPageChange(limit) {
			this.page = 1;
			this.limit = limit;
			// save user settings in localStorage
			localStorage.setItem(
				"pages.administration.students.index.itemsPerPage",
				limit
			);
			this.find();
		},
	},
};
</script>
