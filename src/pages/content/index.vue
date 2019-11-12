<template>
	<section>
		<div v-if="scrollY > 115" class="content__back-to-top">
			<p @click="backToTop">
				<i class="icon fa fa-arrow-circle-up "></i>
			</p>
		</div>
		<div class="content">
			<searchbar
				v-model.lazy="searchQuery"
				class="content__searchbar"
				placeholder="Suche nach..."
				:loading="loading"
			/>
			<div v-if="resources.data.length === 0" class="content__no-results">
				<h3>No search results</h3>
			</div>
			<div class="content__cards-container">
				<BaseGrid column-width="20rem">
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
				</BaseGrid>
			</div>
			<BaseSpinner
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

export default {
	components: {
		Searchbar,
		ContentCard,
	},
	data() {
		return {
			bottom: false,
			scrollY: 0,
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
	async asyncData({ store }) {
		return Promise.all([store.dispatch("content/getResources")]);
	},
	created() {
		window.scrollTo(0, 0);
		window.addEventListener("scroll", () => {
			this.bottom = this.bottomVisible();
			this.scrollY = window.scrollY;
		});
	},
	beforeDestroy() {
		window.removeEventListener("scroll", () => {
			this.bottom = this.bottomVisible();
			this.scrollY = window.scrollY;
		});
	},
	methods: {
		bottomVisible() {
			const { scrollY } = window;
			const visible = document.documentElement.clientHeight;
			const pageHeight = document.documentElement.scrollHeight;
			const bottomOfPage = visible + scrollY >= pageHeight - 2;
			return bottomOfPage || pageHeight < visible;
		},
		async addContent() {
			this.query["$skip"] += this.query["$limit"];
			await this.$store.dispatch("content/addResources", this.query);
		},
		async searchContent() {
			await this.$store.dispatch("content/getResources", this.query);
		},
		backToTop() {
			window.scrollTo(0, 0);
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	&__cards-container {
		margin: var(--space-xl) 0;
	}
	&__back-to-top {
		position: fixed;
		cursor: pointer;
		transform: translateX(-120px);
		i {
			font-size: var(--heading-1);
			color: var(--color-primary);
		}
	}
	&__searchbar {
		width: 100%;
	}
	&__no-results {
		margin-top: var(--space-md);
	}
}
</style>
