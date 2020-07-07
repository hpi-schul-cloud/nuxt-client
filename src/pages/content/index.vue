<template>
	<section>
		<base-icon v-if="isInline" class="arrow__back" source="material" icon="arrow_back" @click="goBack" />
		<div class="content">
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
					<span v-if="!firstSearch" class="content__container">
						<p class="content__total">
							<span v-if="searchQuery.length > 0">
								{{ resources.total }}
								{{ $t("pages.content.index.search_results") }} "{{
									searchQuery
								}}"
							</span>
							<span v-else>
								{{ resources.total }}
								{{ $t("pages.content.index.search_resources") }}
							</span>
						</p>
						<div
							v-if="resources.data.length === 0 && !loading"
							class="content__no-results"
						>
							<content-empty-state />
						</div>
						<base-grid column-width="14rem">
							<content-card
								v-for="resource of resources.data"
								:key="resource.ref.id"
								class="card"
								:resource="resource"
							/>
						</base-grid>
					</span>
				</transition>
			</div>
			<base-spinner
				v-if="loading"
				class="spinner mt--xl-2"
				color="var(--color-tertiary)"
				size="xlarge"
			/>
		</div>
		<content-edu-sharing-footer class="content__footer" />
	</section>
</template>

<script>
import { mapState } from "vuex";
import ContentSearchbar from "@components/molecules/ContentSearchbar";
import ContentCard from "@components/organisms/ContentCard";
import ContentEmptyState from "@components/molecules/ContentEmptyState";
import infiniteScrolling from "@mixins/infiniteScrolling";
import BaseGrid from "@components/base/BaseGrid";
import ContentEduSharingFooter from "@components/molecules/ContentEduSharingFooter";

import Theme from "@theme/config";

export default {
	components: {
		ContentSearchbar,
		ContentCard,
		ContentEmptyState,
		BaseGrid,
		ContentEduSharingFooter,
	},
	mixins: [infiniteScrolling],
	layout: "loggedInFull",
	data() {
		return {
			searchQuery: "",
			backToTopScrollYLimit: 115,
			firstSearch: true,
			activateTransition: false,
			prevRoute: null,
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
				$limit: 12,
				$skip: 0,
			};
			if (this.searchQuery) {
				query["searchQuery"] = this.searchQuery;
			}
			return query;
		},
		isInline() {
			return window.location.search.includes("inline=1");
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
				this.firstSearch = true;
				this.$router.push({
					query: { q: undefined },
				});
				this.$store.commit("content/clearResources");
				return;
			}
			this.$options.debounce = setInterval(() => {
				clearInterval(this.$options.debounce);
				this.$router.push({
					query: {
						q: this.searchQuery,
					},
				});
			}, 500);
		},
		resources() {
			return this.resources;
		},
	},
	mounted() {
		const initialSearchQuery = this.$route.query.q;
		if (initialSearchQuery) {
			this.searchQuery = initialSearchQuery;
			this.firstSearch = false;
			this.activateTransition = true;
			this.enterKeyHandler();
		}
	},
	methods: {
		async addContent() {
			if (this.query.$skip < this.resources.total) {
				this.query.$skip += this.query.$limit;
				await this.$store.dispatch("content/addResources", this.query);
			}
		},
		async searchContent() {
			try {
				await this.$store.dispatch("content/getResources", this.query);
			} catch (error) {
				this.$toast.error(
					this.$t("pages.content.notification.lernstoreNotAvailable")
				);
			}
		},
		enterKeyHandler() {
			this.searchContent();
			this.activateTransition = true;
			setTimeout(() => {
				this.firstSearch = false;
			}, 500);
		},
		goBack() {
			if (window.history.length > 1) {
				this.$router && this.$router.back();
			} else {
				window.close();
			}
		},
	},
	head() {
		if (this.isInline) {
			return {
				title: this.$t("pages.content.page.window.title") + Theme.name + this.$t("pages.content.page.window.title_2")
			};
		} else {
			return {
				title: "LernStore",
			};
		}
	},
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	min-height: 80vh;
	padding: 0 var(--space-lg);
	.arrow__back {
		margin-top: var(--space-xs);
		color: var(--color-tertiary);
	}
	&__container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	&__searchbar {
		width: 100%;
		padding: var(--space-md) 0;
		margin: var(--space-md) 0;
		transition: margin 0.7s;
		transform: scale(1);
	}
	&__total {
		display: flex;
		align-items: center;
		justify-content: flex-start;
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
	}
	.spinner {
		align-self: center;
	}
}

.first-search {
	&__searchbar {
		width: 100%;
		padding: var(--space-md) 0;
		margin: var(--space-xl-5) 0 0;
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
