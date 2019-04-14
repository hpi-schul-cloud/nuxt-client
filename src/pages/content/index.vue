<template>
	<section class="section">
		<searchbar
			v-model.lazy="searchQuery"
			class="searchbar"
			placeholder="Suche nach..."
		/>
		<pagination v-model="skippedItems" :state="pagination" />
		<div class="columns">
			<div v-for="content of searchResults" :key="content._id" class="column">
				<pre>
					{{ content }}
				</pre
				>
			</div>
		</div>
		<pagination v-model="skippedItems" :state="pagination" />
	</section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Searchbar from "@components/Searchbar";
import Pagination from "@components/Pagination";

export default {
	head() {
		return {
			title: "LernStore",
		};
	},
	name: "LernStore",
	components: {
		Searchbar,
		Pagination,
	},
	props: {},
	data() {
		return {
			searchQuery: this.$route.query.q || "",
			skippedItems: this.$route.query.skip
				? parseInt(this.$route.query.skip, 10)
				: 0,
		};
	},
	computed: {
		...mapGetters("content_search", {
			getContent: "get",
			fetchContent: "find",
		}),
		...mapState("content_search", {
			pagination: (state) => {
				return state.pagination.content_list;
			},
		}),
		searchResults() {
			const { $store, getContent, pagination } = this;

			if (pagination) {
				return pagination.ids.map((id) => getContent(id));
			}

			return [];
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
				this.find(to);
			}, 500);
		},
		searchResults() {
			this.skippedItems = parseInt(this.pagination.skip, 10);
		},
		async skippedItems(to, from) {
			if (to === from) {
				return;
			}
			await this.find(this.searchQuery);
		},
	},
	created(ctx) {
		this.find(this.searchQuery);
	},
	methods: {
		async find(searchString) {
			await this.$store.dispatch("content_search/find", {
				query: this.query,
				qid: "content_list",
			});

			this.$router.push({
				query: { q: this.searchQuery, skip: this.skippedItems },
			});
			window.scrollTo(0, 0);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.searchbar {
	margin: 2 * $size-space auto;
}
.columns {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
}
.column {
	width: 100%;
	max-width: 400px;
	margin: 2 * $size-space;
}
</style>
