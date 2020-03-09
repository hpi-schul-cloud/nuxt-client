<template>
	<section class="content">
		<div
			v-if="scrollY > backToTopScrollYLimit && resources.nodes.length > 0"
			class="content__back-to-top"
		>
			<floating-fab
				icon="arrow_drop_up"
				:aria-label="$t('common.actions.scrollToTop')"
				@click="$_backToTop"
			/>
		</div>
		<div class="content">
			<div>
				<content-searchbar
					v-model.lazy="searchQuery"
					:class="
						!activateTransition
							? 'first-search__searchbar'
							: 'content__searchbar'
					"
					placeholder="Lernstore durchsuchen"
					:loading="loading"
					@keyup:enter="transitionHandler"
				/>
				<transition name="fade">
					<span v-if="!firstSearch" class="content__container">
						<p class="content__total">
							<span v-if="searchQuery.length > 0">
								{{ resources.pagination.total }}
								{{ $t("pages.content.index.search_results") }} "{{
									searchQuery
								}}"
							</span>
							<span v-else>
								{{ resources.pagination.total }}
								{{ $t("pages.content.index.search_resources") }}
							</span>
						</p>
						<div
							v-if="resources.nodes.length === 0 && !loading"
							class="content__no-results"
						>
							<content-empty-state />
						</div>
						<base-grid column-width="14rem">
							<content-card
								v-for="resource of resources.nodes"
								:key="resource.ref.id"
								class="card"
								:resource="resource"
							/>
						</base-grid>
						<base-spinner
							v-if="loading && resources.nodes.length !== 0"
							class="content__spinner"
							color="var(--color-primary)"
						/>
					</span>
				</transition>
			</div>
			<edusharing-footer class="content__footer" />
		</div>
	</section>
</template>

<script>
import { mapState } from "vuex";
import ContentSearchbar from "@components/molecules/ContentSearchbar";
import ContentCard from "@components/molecules/ContentCard";
import ContentEmptyState from "@components/molecules/ContentEmptyState";
import infiniteScrolling from "@mixins/infiniteScrolling";
import BaseGrid from "@components/base/BaseGrid";
import FloatingFab from "@components/molecules/FloatingFab";
import EdusharingFooter from "@components/molecules/EdusharingFooter";

export default {
	components: {
		ContentSearchbar,
		ContentCard,
		ContentEmptyState,
		BaseGrid,
		FloatingFab,
		EdusharingFooter,
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
			stateQuery: (state) => {
				return state.searchQuery;
			},
		}),
		query() {
			const query = {
				count: 10,
				from: 0,
			};
			if (this.searchQuery) {
				query["searchQuery"] = this.searchQuery;
			}
			return query;
		},
	},
	watch: {
		bottom(bottom) {
			if (bottom && !this.firstSearch && !this.loading) {
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
			/**
			 * FOR ALTERNATIVE IMPLEMENTATION:
			 * Activate transition after 3 key presses
			 *
			 * if (this.searchQuery.length >= 3) {
			 *	this.transitionHandler();
			 * }
			 */
			this.$options.debounce = setInterval(() => {
				clearInterval(this.$options.debounce);
				this.searchContent();
			}, 500);
		},
		resources() {
			return this.resources;
		},
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			if (from.name === "content-id") {
				vm.searchQuery = vm.stateQuery;
				vm.firstSearch = false;
				vm.activateTransition = true;
			}
		});
	},
	methods: {
		async addContent() {
			this.query["from"] += this.query["count"];
			await this.$store.dispatch("content/addResources", this.query);
		},
		async searchContent() {
			await this.$store.dispatch("content/getResources", this.query);
		},
		transitionHandler() {
			this.activateTransition = true;
			setTimeout(() => {
				this.firstSearch = false;
			}, 500);
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
	justify-content: space-between;
	width: 100%;
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
		justify-content: flex-end;
		width: 100%;
		color: var(--color-gray);
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
}

.first-search {
	&__searchbar {
		width: 100%;
		padding: var(--space-md) 0;
		margin: var(--space-xl-5) var(--space-md) 0;
		transform: scale(1.3);
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
