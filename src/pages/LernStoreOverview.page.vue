<template>
	<section :class="{ inline: isInline }">
		<v-btn
			v-if="isInline"
			variant="plain"
			:ripple="false"
			design="none"
			class="arrow__back"
			@click="goBack"
		>
			<v-icon> {{ mdiChevronLeft }}</v-icon>
			{{ $t("pages.content.index.backToCourse") }}
		</v-btn>
		<div class="content" :class="{ inline: isInline }">
			<div>
				<div class="search">
					<div class="search__input-container">
						<v-text-field
							v-model="searchQuery"
							autofocus
							variant="underlined"
							color="primary"
							:class="
								activateTransition
									? 'content__searchbar'
									: 'first-search__searchbar'
							"
							:placeholder="$t('pages.content.index.search.placeholder')"
							@update:model-value="enterKeyHandler"
						>
							<template v-slot:append-inner>
								<v-btn
									v-if="searchQuery"
									:icon="mdiClose"
									:aria-label="$t('common.actions.delete')"
									color="rgba(var(--v-theme-black))"
									density="compact"
									size="x-large"
									variant="text"
									:ripple="false"
									@click="searchQuery = ''"
								/>
								<v-icon
									v-else
									:icon="mdiMagnify"
									color="rgba(var(--v-theme-black))"
									size="x-large"
								/>
							</template>
						</v-text-field>
					</div>
				</div>
				<transition name="fade">
					<div class="content__container" v-if="true">
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
							<content-initial-state v-if="searchQuery.length === 0" />
							<div
								v-else-if="resources.data.length === 0"
								class="content__no_results"
							>
								<content-empty-state />
							</div>
						</span>
						<lern-store-grid
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
						</lern-store-grid>
					</div>
				</transition>
			</div>
			<v-progress-circular
				v-if="loading"
				indeterminate
				color="secondary"
				size="115"
				class="align-self-center mt-4"
			/>
			<content-edu-sharing-footer class="content__footer" />
		</div>
	</section>
</template>

<script>
import { mdiChevronLeft, mdiMagnify, mdiClose } from "@mdi/js";
import { contentModule, notifierModule } from "@/store";
import infiniteScrolling from "@/mixins/infiniteScrolling";
import { buildPageTitle } from "@/utils/pageTitle";
import ContentCard from "@/components/lern-store/ContentCard";
import ContentEmptyState from "@/components/lern-store/ContentEmptyState";
import LernStoreGrid from "@/components/lern-store/LernStoreGrid.vue";
import ContentEduSharingFooter from "@/components/lern-store/ContentEduSharingFooter";
import ContentInitialState from "@/components/lern-store/ContentInitialState";

export default {
	components: {
		ContentCard,
		ContentEmptyState,
		LernStoreGrid,
		ContentInitialState,
		ContentEduSharingFooter,
	},
	mixins: [infiniteScrolling],
	data() {
		return {
			searchQuery: "",
			searchQueryResult: "",
			backToTopScrollYLimit: 115,
			activateTransition: false,
			prevRoute: null,
			mdiChevronLeft,
			mdiMagnify,
			mdiClose,
		};
	},
	computed: {
		resources() {
			return contentModule.getResourcesGetter;
		},
		player() {
			return contentModule.getCurrentPlayer;
		},
		loading() {
			return contentModule.getLoading;
		},
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
			const { data, total } = this.resources;
			if (bottom && !this.loading && data.length < total) {
				this.addContent();
			}
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
				return;
			}
			this.$options.debounce = setInterval(() => {
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
	},
	mounted() {
		const pageTitle = this.isInline
			? this.$t("pages.content.page.window.title", {
					instance: this.$theme.name,
				})
			: this.$t("common.words.lernstore");
		document.title = buildPageTitle(pageTitle);

		const initialSearchQuery = this.$route.query.q;
		if (initialSearchQuery) {
			this.searchQuery = initialSearchQuery;
			this.activateTransition = true;
			if (this.resources.data.length === 0) {
				this.enterKeyHandler();
			}
		}
	},
	methods: {
		async addContent() {
			if (this.resources.data.length < this.resources.total) {
				this.query.$skip += this.query.$limit;
				await contentModule.addResources(this.query);
			}
		},
		async searchContent() {
			try {
				await contentModule.getResources(this.query);
			} catch (error) {
				notifierModule.show({
					text: this.$t("pages.content.notification.lernstoreNotAvailable"),
					status: "error",
					timeout: 10000,
				});
			}
		},
		async searchH5P() {
			await contentModule.getResources({
				$limit: 4,
				$skip: 0,
				searchQuery: "h5p",
			});
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
};
</script>

<style lang="scss" scoped>
@import "~vuetify/settings";
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
		color: rgba(var(--v-theme-secondary));
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

	&__footer {
		align-self: flex-end;
		padding-bottom: var(--space-sm);
	}
}
.search {
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 100%;

	&__input-container {
		width: calc(
			2 * var(--size-content-width-min)
		); // keep in sync with wrapper in content (EmptyState.vue)

		:deep(.v-field__input) {
			font-size: var(--text-lg);
			text-align: center;

			@media #{map-get($display-breakpoints, 'sm-and-up')} {
				font-size: var(--heading-6);
			}

			@media #{map-get($display-breakpoints, 'md-and-up')} {
				font-size: var(--heading-4);
			}
		}
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
