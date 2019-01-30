<template>
	<section class="section">
		<h1>Lernstore</h1>
		<Searchbar
			v-model.lazy="searchQuery"
			type="text"
			placeholder="Suche nach..."
		/>
		<Pagination v-model="skippedItems" :state="searchResults" />
		<div class="columns is-multiline is-mobile">
			<div
				v-for="content of searchResults.data"
				:key="content._id"
				class="column"
			>
				<ContentCard :data="content" />
			</div>
		</div>
		<Pagination v-model="skippedItems" :state="searchResults" />
	</section>
</template>

<script>
import ContentCard from "@components/CardLernStoreContent.vue";
import Searchbar from "@components/searchbar.vue";
import Pagination from "@components/pagination.vue";

export default {
	name: "LernStore",
	components: {
		ContentCard,
		Searchbar,
		Pagination,
	},
	props: {},
	data() {
		return {
			searchQuery: this.$route.query.q || "",
			searchResults: {},
			skippedItems: this.$route.query.skip
				? parseInt(this.$route.query.skip, 10)
				: 0,
		};
	},
	watch: {
		searchQuery(to, from) {
			if (this.$options.debounce) {
				clearInterval(this.$options.debounce);
			}
			if (to === from) {
				return;
			}
			this.$options.debounce = setInterval(() => {
				clearInterval(this.$options.debounce);
				this.skippedItems = 0;
				this.find(to);
			}, 500);
		},
		skippedItems(to, from) {
			if (to === from) {
				return;
			}
			this.find(this.searchQuery);
		},
	},
	created(ctx) {
		this.find(this.searchQuery);
	},
	methods: {
		find(searchString) {
			const query = {};
			if (searchString) {
				query["_all[$match]"] = this.searchQuery;
				query["$skip"] = this.skippedItems;
			}
			this.$store
				.dispatch("content_search/find", {
					query: query,
				})
				.then((result) => {
					this.searchResults = result;
					this.skippedItems = parseInt(result.skip, 10);
					this.$router.push({
						query: { q: this.searchQuery, skip: this.skippedItems },
					});
					window.scrollTo(0, 0);
			});
		},
	},
};
</script>

<style lang="scss" scoped>
input.input {
	margin-bottom: 2rem;
}
</style>
