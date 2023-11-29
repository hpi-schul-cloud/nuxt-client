<template>
	<section :class="{ inline: isInline }">
		<v-btn
			v-if="isInline"
			text
			plain
			:ripple="false"
			design="none"
			class="arrow__back"
			@click="goBack"
		>
			<v-icon> {{ mdiChevronLeft }}</v-icon>
			{{ $t("pages.content.index.backToCourse") }}
		</v-btn>
		<div class="content" :class="{ inline: isInline }">
			<iframe
				src="https://repo.test.mediathek.dev.dbildungsplattform.de/edu-sharing/components/search"
				style="height: calc(100vh - var(--sidebar-item-height) - 105.58px)"
				title="edu-sharing-search-environment"
			/>
		</div>
	</section>
</template>

<script>
import infiniteScrolling from "@/mixins/infiniteScrolling";
import { contentModule, notifierModule } from "@/store";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiChevronLeft } from "@mdi/js";

export default {
	mixins: [infiniteScrolling],
	data() {
		return {
			searchQuery: "",
			searchQueryResult: "",
			backToTopScrollYLimit: 115,
			activateTransition: false,
			prevRoute: null,
			mdiChevronLeft,
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
		resources() {
			return this.resources;
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
.content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	min-height: calc(100vh - var(--sidebar-item-height) - 105.58px);
	// footer height  6558px + margin 40px (24px top + 16px bottom)
	padding: 0 var(--space-lg);
	overflow-y: hidden;

	.arrow__back {
		margin-top: var(--space-xs);
		font-weight: var(--font-weight-bold);
		color: var(--v-secondary-base);
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

::v-deep
	.v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover)
	.v-btn__content {
	opacity: 1;
}
</style>
