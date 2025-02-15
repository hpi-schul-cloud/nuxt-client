<template>
	<section :class="{ inline: isInline }">
		<v-btn
			v-if="isInline"
			variant="text"
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
							:class="
								activateTransition
									? 'content__searchbar'
									: 'first-search__searchbar'
							"
							:placeholder="$t('pages.content.index.search.placeholder')"
							@update:model-value="onInput"
							data-testid="learningstore-search-input"
						>
							<template v-slot:append-inner>
								<v-btn
									v-if="searchQuery"
									:icon="mdiClose"
									:aria-label="$t('common.actions.delete')"
									density="compact"
									size="x-large"
									variant="text"
									:ripple="false"
									@click="searchQuery = ''"
								/>
								<v-icon v-else :icon="mdiMagnify" size="x-large" />
							</template>
						</v-text-field>
					</div>
				</div>
				<transition name="fade">
					<div class="content__container" v-if="true">
						<template v-if="searchQuery.length > 1">
							<p v-show="resources.data.length !== 0" class="content__total">
								{{ resources.total }}
								{{ $t("pages.content.index.search_results") }} "{{
									searchQueryResult
								}}"
							</p>
							<v-infinite-scroll width="100%" :items="resources" @load="onLoad">
								<lern-store-grid
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
								<template #loading>
									<v-progress-circular
										indeterminate
										size="115"
										class="align-self-center mt-4"
									/>
								</template>
								<template #empty>
									<div v-if="!reachedTotal" class="content__no_results">
										<content-empty-state />
									</div>
								</template>
							</v-infinite-scroll>
						</template>
						<span v-if="!loading" class="content__container_child">
							<content-initial-state v-if="searchQuery.length === 0" />
						</span>
					</div>
				</transition>
			</div>
			<content-edu-sharing-footer class="content__footer" />
		</div>
	</section>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useDebounceFn, watchDebounced } from "@vueuse/core";
import { mdiChevronLeft, mdiMagnify, mdiClose } from "@icons/material";
import {
	CONTENT_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import ContentCard from "@/components/lern-store/ContentCard.vue";
import ContentEmptyState from "@/components/lern-store/ContentEmptyState.vue";
import LernStoreGrid from "@/components/lern-store/LernStoreGrid.vue";
import ContentEduSharingFooter from "@/components/lern-store/ContentEduSharingFooter.vue";
import ContentInitialState from "@/components/lern-store/ContentInitialState.vue";
import { useI18n } from "vue-i18n";
import themeConfig from "@/theme.config";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const contentModule = injectStrict(CONTENT_MODULE_KEY);
const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

const searchQuery = ref("");
const activateTransition = ref(false);
const searchQueryResult = ref("");
const queryOptions = ref({ $limit: 12, $skip: 0 });

onMounted(() => {
	const pageTitle = isInline.value
		? t("pages.content.page.window.title", {
				instance: themeConfig.name,
			})
		: t("common.words.lernstore");
	document.title = buildPageTitle(pageTitle);

	const initialSearchQuery = route.query.q;
	if (initialSearchQuery) {
		searchQuery.value = initialSearchQuery as string;
		activateTransition.value = true;
	}
});

const isInline = computed(() => !!route.query.inline);
const resources = computed(() => contentModule.getResourcesGetter);
const loading = computed(() => contentModule.getLoading);
const reachedTotal = computed(
	() =>
		resources.value.total !== 0 &&
		resources.value.data.length >= resources.value.total
);

const onInput = async () => {
	await searchContent();
	activateTransition.value = true;
};

const searchContent = useDebounceFn(async () => {
	try {
		await contentModule.getResources(searchQuery.value);
	} catch (error) {
		notifierModule.show({
			text: t("pages.content.notification.lernstoreNotAvailable"),
			status: "error",
			timeout: 5000,
		});
	}
}, 500);

const onLoad = async ({
	done,
}: {
	side: "start" | "end" | "both";
	done: (status: "ok" | "empty" | "loading" | "error") => void;
}) => {
	if (reachedTotal.value) {
		done("empty");
		return;
	}

	if (!resources.value.data.length && searchQuery.value) {
		await searchContent();

		if (!resources.value.data.length) {
			done("empty");
			return;
		}
	} else {
		await addContent();
	}

	done("ok");
};

const addContent = async () => {
	queryOptions.value.$skip += queryOptions.value.$limit;

	const query = {
		$limit: queryOptions.value.$limit,
		$skip: queryOptions.value.$skip,
		searchQuery: searchQuery.value,
	};

	try {
		await contentModule.addResources(query);
	} catch (error) {
		notifierModule.show({
			text: t("pages.content.notification.lernstoreNotAvailable"),
			status: "error",
			timeout: 5000,
		});
	}
};

const updateURLQueryDebounced = useDebounceFn(() => {
	searchQueryResult.value = searchQuery.value;
	router.push({
		query: {
			...route.query,
			q: searchQuery.value,
		},
	});
}, 200);

const goBack = () => {
	window.close();
};

watchDebounced(
	searchQuery,
	async (to, from) => {
		if (to === from || !to) {
			router.push({
				query: {
					...route.query,
					q: "",
				},
			});
			return;
		}

		await updateURLQueryDebounced();
	},
	{ debounce: 200 }
);
</script>

<style lang="scss" scoped>
@import "@/styles/settings.scss";

:deep {
	.v-infinite-scroll--vertical {
		overflow-y: visible;
	}
}

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
