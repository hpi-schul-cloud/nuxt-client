<template>
	<section>
		<div v-if="scrollY > 115" class="content__back-to-top">
			<p @click="$_backToTop">
				<i class="icon fa fa-chevron-circle-up"></i>
			</p>
		</div>
		<base-grid class="content">
			<searchbar
				v-model.lazy="searchQuery"
				class="content__searchbar"
				placeholder="Suche nach..."
				:loading="loading"
			/>
			<p v-if="searchQuery.length > 0" class="content__total"
				>{{ resources.total }} Suchergebnisse für "{{ searchQuery }}"</p
			>
			<div v-if="resources.data.length === 0" class="content__no-results">
				<content-empty-state />
			</div>
			<base-grid class="content__cards-container">
				<base-grid column-width="17rem">
					<content-card
						v-for="resource of resources.data"
						:id="resource._id"
						:key="resource._id"
						class="card"
						:content-category="resource.resourceCategory"
						:description="resource.description"
						:licenses="resource.licenses"
						:mime-type="resource.mimeType"
						:origin-id="resource.originId"
						:provider-name="resource.providerName"
						:tags="resource.tags.slice(0, 5)"
						:thumbnail="resource.thumbnail"
						:title="resource.title"
						:url="resource.url"
					/>
				</base-grid>
			</base-grid>
			<BaseSpinner
				v-if="loading && resources.data.length !== 0"
				class="content__spinner"
				color="var(--color-primary)"
			/>
		</base-grid>
	</section>
</template>

<script>
import { mapState } from "vuex";
import Searchbar from "@components/molecules/Searchbar";
import ContentCard from "@components/molecules/ContentCard";
import ContentEmptyState from "@components/molecules/ContentEmptyState";
import infiniteScrolling from "@mixins/infiniteScrolling";

export default {
	components: {
		Searchbar,
		ContentCard,
		ContentEmptyState,
	},
	mixins: [infiniteScrolling],
	async asyncData({ store }) {
		return store.dispatch("content/getResources");
	},
	data() {
		return {
			searchQuery: "",
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
				$limit: 9,
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
			const { limit, skip, total } = this.resources;
			if (bottom && !this.loading && total > limit * skip) {
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
		padding: var(--space-md);
		color: var(--color-primary);
	}

	&__back-to-top {
		position: fixed;
		cursor: pointer;
		transform: translateX(-8vw) translateY(75vh);
		i {
			font-size: var(--heading-1);
			color: var(--color-primary);
			transition: all 0.1s ease-in-out;
			&:hover {
				transform: scale(1.3, 1.3);
			}
		}
	}
	&__no-results {
		margin-top: var(--space-md);
	}
	&__spinner {
		margin-top: var(--space-md);
	}
}
</style>
