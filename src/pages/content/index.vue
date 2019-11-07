<template>
	<section class="section">
		<searchbar
			v-model.lazy="searchQuery"
			class="searchbar"
			placeholder="Suche nach..."
		/>
		<pagination v-model="skippedItems" :state="pagination" />
		<div class="card-container">
			<content-card
				v-for="content of searchResults.data"
				:id="content._id"
				:key="content._id"
				class="card"
				:content-category="content.contentCategory"
				:description="content.description"
				:licenses="content.licenses"
				:mime-type="content.mimeType"
				:origin-id="content.originId"
				:provider-name="content.providerName"
				:tags="content.tags"
				:thumbnail="content.thumbnail"
				:title="content.title"
				:url="content.url"
			/>
		</div>
		<pagination v-model="skippedItems" :state="pagination" />
	</section>
</template>

<script>
import { mapState } from "vuex";
import Searchbar from "@components/molecules/Searchbar";
import Pagination from "@components/organisms/Pagination";
import ContentCard from "@components/molecules/ContentCard";

export default {
	head() {
		return {
			title: "LernStore",
		};
	},
	components: {
		Searchbar,
		Pagination,
		ContentCard,
	},
	props: {},
	data() {
		return {
			searchQuery: this.$route.query.q || "",
			skippedItems: this.$route.query.skip
				? parseInt(this.$route.query.skip, 10)
				: 0,
			currentPage: parseInt(this.$route.query.skip) || 1,
		};
	},
	computed: {
		...mapState("content", {
			pagination: (state) => {
				return state.searchResult;
			},
		}),
		searchResults() {
			const { pagination } = this;
			return pagination;
		},
		query() {
			const query = {};
			if (this.searchQuery) {
				query["_all[$match]"] = this.searchQuery;
				query["$skip"] = this.skippedItems;
			}
			return query;
		},
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
				this.find();
			}, 500);
		},
		searchResults() {
			this.skippedItems = parseInt(this.pagination.skip, 10);
		},
		async skippedItems(to, from) {
			if (to === from) {
				return;
			}
			await this.find();
		},
	},
	async asyncData({ store }) {
		return Promise.all([
			store.dispatch("content/getResources"),
			store.dispatch("content/searchResources"),
		]);
	},
	methods: {
		async find() {
			await this.$store.dispatch("content/searchResources", this.query);

			this.$router.push({
				query: { q: this.searchQuery, skip: this.skippedItems },
			});
			window.scrollTo(0, 0);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.searchbar {
	margin: var(--space-sm) auto;
}
.card-container {
	display: grid;
	grid-template-columns: 33% 33% 33%;
	grid-row-gap: 20px;
	grid-column-gap: 20px;
	margin: var(--space-md) 0;
}
</style>
