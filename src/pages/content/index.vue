<template>
	<section :class="{ inline: isInline }">
		<base-button
			v-if="isInline"
			design="none"
			class="arrow__back"
			@click="goBack"
		>
			<base-icon source="material" icon="navigate_before" />
			{{ $t("pages.content.index.backToCourse") }}
		</base-button>
		<div class="content" :class="{ inline: isInline }">
			<div>
				<content-searchbar
					v-model.lazy="searchQuery"
					:class="
						!activateTransition
							? 'first-search__searchbar'
							: 'content__searchbar'
					"
					:placeholder="$t('pages.content.index.search.placeholder')"
					@keyup:enter="enterKeyHandler"
				/>
				<transition name="fade">
					<div class="content__container">
						<p
							v-show="resources.data.length !== 0 && searchQuery.length > 1"
							class="content__total"
						>
							{{ resources.total }}
							{{ $t("pages.content.index.search_results") }} "{{
								searchQueryResult
							}}"
						</p>
						<span v-if="!loading" class="content__container_child">
							<!-- initial state, empty search -->
							<content-initial-state v-if="searchQuery.length === 0" />
							<!-- search query not empty and there are no results -->
							<div
								v-else-if="resources.data.length === 0"
								class="content__no_results"
							>
								<content-empty-state />
							</div>
						</span>
						<!-- search query not empty and there are results -->
						<base-grid
							v-if="searchQuery.length > 1"
							column-width="14rem"
							data-testid="lernStoreCardsContainer"
						>
							<content-card
								v-for="resource of resources.data"
								:key="resource.properties['ccm:replicationsourceuuid'][0]"
								class="card"
								:inline="isInline"
								:resource="resource"
							/>
						</base-grid>
					</div>
				</transition>
			</div>
			<base-spinner
				v-show="loading"
				class="spinner mt--xl-2"
				color="var(--color-tertiary)"
				size="xlarge"
			/>
			<content-edu-sharing-footer class="content__footer" />
		</div>
	</section>
</template>

<script>
import { mapGetters } from "vuex";
import ContentSearchbar from "@components/molecules/ContentSearchbar";
import ContentCard from "@components/organisms/ContentCard";
import ContentEmptyState from "@components/molecules/ContentEmptyState";
import infiniteScrolling from "@mixins/infiniteScrolling";
import BaseGrid from "@components/base/BaseGrid";
import ContentEduSharingFooter from "@components/molecules/ContentEduSharingFooter";
import BaseButton from "../../components/base/BaseButton";
import ContentInitialState from "@components/molecules/ContentInitialState";

export default {
	meta: {
		requiredPermissions: ["LERNSTORE_VIEW"],
	},
	components: {
		BaseButton,
		ContentSearchbar,
		ContentCard,
		ContentEmptyState,
		BaseGrid,
		ContentInitialState,
		ContentEduSharingFooter,
	},
	mixins: [infiniteScrolling],
	layout: "loggedInFull",
	data() {
		return {
			searchQuery: "",
			searchQueryResult: "",
			backToTopScrollYLimit: 115,
			activateTransition: false,
			prevRoute: null,
		};
	},
	computed: {
		...mapGetters("content", {
			resources: "getResources",
			loading: "getLoading",
		}),
		query() {
			const query = {
				$limit: 12,
				$skip: 0,
			};
			if (this.searchQuery) {
				query["searchQuery"] = this.searchQuery;
			}
			return query;
		},
		isInline() {
			return !!this.$route.query.inline;
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

			if (to === from || !to) {
				this.$router.push({
					query: {
						...this.$route.query,
						q: "",
					},
				});
				this.$store.commit("content/clearResources");
				return;
			}
			this.$options.debounce = setInterval(() => {
				this.$store.commit("content/clearResources");
				this.searchQueryResult = this.searchQuery;

				clearInterval(this.$options.debounce);
				this.$router.push({
					query: {
						...this.$route.query,
						q: this.searchQuery,
					},
				});
			}, 200);
		},
		resources() {
			return this.resources;
		},
	},
	mounted() {
		const initialSearchQuery = this.$route.query.q;
		if (initialSearchQuery) {
			this.searchQuery = initialSearchQuery;
			this.activateTransition = true;
			this.enterKeyHandler();
		}
	},
	methods: {
		async addContent() {
			if (this.query.$skip < this.resources.total) {
				this.query.$skip += this.query.$limit;
				// TODO wrong use of store (not so bad)
				await this.$store.dispatch("content/addResources", this.query);
			}
		},
		async searchContent() {
			try {
				// TODO wrong use of store (not so bad)
				await this.$store.dispatch("content/getResources", this.query);
			} catch (error) {
				this.$toast.error(
					this.$t("pages.content.notification.lernstoreNotAvailable")
				);
			}
		},
		enterKeyHandler() {
			if (this.$options.debounceTyping) {
				clearTimeout(this.$options.debounceTyping);
			}
			this.$options.debounceTyping = setTimeout(() => {
				this.searchContent();
				this.activateTransition = true;
			}, 500);
		},
		goBack() {
			window.close();
		},
	},
	head() {
		return this.isInline
			? {
					title: this.$t("pages.content.page.window.title", {
						instance: this.$theme.name,
					}),
			  }
			: { title: this.$t("global.sidebar.lernstore") };
	},
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	min-height: calc(100vh - var(--sidebar-item-height));
	padding: 0 var(--space-lg);
	overflow-y: hidden;

	.arrow__back {
		margin-top: var(--space-xs);
		font-weight: var(--font-weight-bold);
		color: var(--color-tertiary);
		cursor: pointer;
	}
	&__container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	&__container_child {
		width: 100%;
	}
	&__searchbar {
		width: 100%;
		padding: var(--space-md) 0;
		margin: var(--space-md) 0;
		transition: margin 0.7s;
		transform: scale(1);
	}
	&__total {
		width: 100%;
	}
	&__no-results {
		margin-top: var(--space-md);
	}
	&__spinner {
		margin: var(--space-lg) 0;
	}
	&__footer {
		align-self: flex-end;
		padding-bottom: var(--space-sm);
	}
	.spinner {
		align-self: center;
	}
}

.inline {
	min-height: calc(100vh - calc(24 * var(--border-width-bold)));
}

.first-search {
	&__searchbar {
		width: 100%;
		padding: var(--space-md) 0;
		margin-top: var(--space-xl-3);
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity var(--duration-transition-slow);
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
