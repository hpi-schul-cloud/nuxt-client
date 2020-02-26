<template>
	<section class="content">
		<div
			v-if="scrollY > backToTopScrollYLimit && resources.data.length > 0"
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
					<span v-if="!firstSearch">
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
					</span>
				</transition>
			</div>
			<edusharing-footer />
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
	methods: {
		async addContent() {
			this.query["$skip"] += this.query["$limit"];
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
	height: 100%;

	&__searchbar {
		width: 100%;
		padding: var(--space-md) 0;
		margin: var(--space-md) 0;
		transition: transform 0.7s;
		transform: scale(1) translateY(0%);
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
		margin-top: var(--space-md);
	}
}

.first-search {
	&__searchbar {
		width: 100%;
		padding: var(--space-md) 0;
		margin: var(--space-md) 0;
		transform: scale(1.3) translateY(250%);
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
