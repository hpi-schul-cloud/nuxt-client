<!-- eslint-disable prettier/prettier -->
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
			<iframe
				src="https://repo.test.mediathek.dev.dbildungsplattform.de/edu-sharing/components/search"
				style="height: calc(100vh - var(--sidebar-item-height) - 105.58px)"
				title="edu-sharing-search-environment"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
import themeConfig from "@/theme.config";
import {
	CONTENT_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiChevronLeft } from "@mdi/js";
import { useDebounceFn, watchDebounced } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
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
			timeout: 10000,
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
			timeout: 10000,
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
@import "~vuetify/settings";

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
	min-height: calc(100vh - var(--sidebar-item-height) - 105.58px);
	// footer height  6558px + margin 40px (24px top + 16px bottom)
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
