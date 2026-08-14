<template>
	<DefaultWireframe max-width="full" :fab-items="fabAction" main-with-bottom-padding>
		<template #header>
			<h1 data-testid="news-overview-title">{{ t("pages.news.title") }}</h1>
			<VTabs v-if="canEditNews && unpublishedTotal > 0" v-model="activeTab" class="mt-4" grow>
				<VTab :prepend-icon="mdiEyeOutline" value="published" data-testid="published-news-tab">
					{{ t("pages.news.tabs.published") }}
				</VTab>
				<VTab :prepend-icon="mdiEyeOffOutline" value="unpublished" data-testid="unpublished-news-tab">
					{{ t("pages.news.tabs.unpublished") }}
					<span class="ml-1" data-testid="unpublished-news-count"> ({{ unpublishedTotal }}) </span>
				</VTab>
			</VTabs>
		</template>

		<SvsLoading :loading-state="loadingState">
			<EmptyState v-if="news.length === 0" data-testid="empty-state-news" :title="t('pages.dashboard.empty.news')">
				<template #media>
					<SvgNewsEmpty />
				</template>
			</EmptyState>
			<template v-else>
				<NewsGrid class="mt-8" :news-items="news" />
				<VPagination
					v-if="pageCount > 1"
					:model-value="currentPage"
					class="mt-6"
					:length="pageCount"
					data-testid="news-pagination"
					@update:model-value="onPageChange"
				/>
			</template>
		</SvsLoading>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import SvgNewsEmpty from "@/assets/img/SvgNewsEmpty.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { NewsResponse, Permission } from "@api-server";
import { useNewsActions } from "@data-access";
import { useAppStore } from "@data-app";
import { NewsGrid } from "@feature-news";
import { mdiEyeOffOutline, mdiEyeOutline, mdiPlus } from "@icons/material";
import { SvsLoading } from "@ui-containers";
import { EmptyState } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const NEWS_PER_PAGE = 10;

const { t } = useI18n();
const appStore = useAppStore();
const { fetchNewsPage, loadingState } = useNewsActions();
const { fetchNewsPage: fetchNewsCountPage } = useNewsActions();

const news = ref<NewsResponse[]>([]);
const total = ref(0);
const unpublishedTotal = ref(0);
const activeTab = ref<"published" | "unpublished">("published");
const currentPage = ref(1);

const canCreateNews = computed(() => appStore.hasPermission(Permission.NEWS_CREATE));
const canEditNews = computed(() => appStore.hasPermission(Permission.NEWS_EDIT));
const pageCount = computed(() => Math.ceil(total.value / NEWS_PER_PAGE));
const fabAction = computed(() => {
	if (!canCreateNews.value) return;

	return [
		{
			icon: mdiPlus,
			label: t("pages.news.index.new"),
			to: "/news/new",
			dataTestId: "create-news-btn",
		},
	];
});

useTitle(buildPageTitle(t("pages.news.title")));

const loadNews = async () => {
	const unpublished = activeTab.value === "unpublished";
	const { success, result } = await fetchNewsPage({
		limit: NEWS_PER_PAGE,
		skip: (currentPage.value - 1) * NEWS_PER_PAGE,
		unpublished,
	});

	if (success && result) {
		news.value = result.data.data;
		total.value = result.data.total;
	}
};

const loadUnpublishedTotal = async () => {
	if (!canEditNews.value) return;
	const { success, result } = await fetchNewsCountPage({ limit: 1, skip: 0, unpublished: true });
	if (success && result) {
		unpublishedTotal.value = result.data.total;
	}
};

const onPageChange = async (page: number) => {
	currentPage.value = page;
	await loadNews();
};

watch(activeTab, async () => {
	currentPage.value = 1;
	await loadNews();
});
loadNews();
loadUnpublishedTotal();
</script>
