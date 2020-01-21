<template>
	<section>
		<div v-if="scrollY > backToTopScrollYLimit" class="content__back-to-top">
			<floating-fab icon="arrow_drop_up" @click="$_backToTop" />
		</div>
		<div class="content">
			<searchbar
				v-model.lazy="searchQuery"
				class="content__searchbar"
				:placeholder="$t('pages.content.index.search_for')"
				:loading="loading"
			/>
			<p class="content__total">
				<span v-if="searchQuery.length > 0">
					{{ resources.data.length }}
					{{ $t("pages.content.index.search_results") }} "{{ searchQuery }}"
				</span>
				<span v-else>
					{{ resources.data.length }}
					{{ $t("pages.content.index.search_resources") }}
				</span>
			</p>
			<div v-if="resources.data.length === 0" class="content__no-results">
				<content-empty-state />
			</div>
			<base-grid column-width="15rem">
				<content-card
					v-for="resource of resources.data"
					:id="resource._id"
					:key="resource._id"
					class="card"
					:thumbnail="resource.thumbnail"
					:title="resource.title"
					:url="resource.url"
				/>
			</base-grid>
			<base-spinner
				v-if="loading && resources.data.length !== 0"
				class="content__spinner"
				color="var(--color-primary)"
			/>
		</div>
	</section>
</template>

<script>
import { mapState } from "vuex";
import Searchbar from "@components/molecules/Searchbar";
import ContentCard from "@components/molecules/ContentCard";
import ContentEmptyState from "@components/molecules/ContentEmptyState";
import infiniteScrolling from "@mixins/infiniteScrolling";
import BaseGrid from "@components/base/BaseGrid";
import FloatingFab from "@components/molecules/FloatingFab";

export default {
	components: {
		Searchbar,
		ContentCard,
		ContentEmptyState,
		BaseGrid,
		FloatingFab,
	},
	mixins: [infiniteScrolling],
	layout: "loggedInFull",
	async asyncData({ store }) {
		return store.dispatch("content/getResources");
	},
	data() {
		return {
			searchQuery: "",
			backToTopScrollYLimit: 115,
		};
	},
	computed: {
		...mapState("content", {
			resources: (state) => {
				return state.resources;
			},
			loading: (state) => {
				return state.loading;
			},
		}),
		query() {
			const query = {
				$limit: 10,
				$skip: 0,
			};
			if (this.searchQuery) {
				query["_all[$match]"] = this.searchQuery;
			}
			return query;
		},
	},
	watch: {
		bottom(bottom) {
			const { skip, total } = this.resources;
			if (bottom && !this.loading && skip < total) {
				this.addContent();
			}
		},
		loading() {
			return this.loading;
		},
		searchQuery(to, from) {
			if (this.$options.debounce) {
				clearInterval(this.$options.debounce);
			}
			if (to === from) {
				return;
			}
			this.$options.debounce = setInterval(() => {
				clearInterval(this.$options.debounce);
				this.searchContent();
			}, 500);
		},
		resources() {
			return this.resources;
		},
	},
	methods: {
		async addContent() {
			this.query["$skip"] += this.query["$limit"];
			await this.$store.dispatch("content/addResources", this.query);
		},
		async searchContent() {
			await this.$store.dispatch("content/getResources", this.query);
		},
	},
	head() {
		return {
			title: "LernStore",
		};
	},
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	&__searchbar {
		width: 100%;
		padding: var(--space-md) 0;
	}
	&__total {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
		color: var(--color-primary);
	}
	&__no-results {
		margin-top: var(--space-md);
	}
	&__spinner {
		margin-top: var(--space-md);
	}
}
</style>
