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
				<div class="news-grid mt-8" data-testid="news-section">
					<VCard
						v-for="newsItem in news"
						:key="newsItem.id"
						class="d-flex flex-column news-card"
						:href="`/news/${newsItem.id}`"
						data-testid="news-card-item"
						@dragstart.prevent
					>
						<VCardTitle class="news-card-title bg-primary-lighten text-wrap">
							<div class="d-flex align-center">
								<VIcon size="14" class="mr-1" :icon="mdiNewspaperVariantOutline" />
								<span class="text-sm font-weight-regular">{{ fromNowUtc(newsItem.displayAt) }}</span>
								<VChip
									v-if="newsItem.targetModel === NewsTargetModel.TEAMS"
									class="ml-auto"
									size="small"
									variant="tonal"
								>
									{{ newsItem.target.name }}
								</VChip>
							</div>
							<h2 class="text-h4 my-1 news-title" data-testid="news-title">{{ newsItem.title }}</h2>
						</VCardTitle>
						<VCardText class="flex-grow-1 pt-3 text-md">
							<RenderHTML :html="newsItem.content" class="news-content" data-testid="news-content" />
						</VCardText>
					</VCard>
				</div>
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
import { fromNowUtc } from "@/utils/date-time.utils";
import { buildPageTitle } from "@/utils/pageTitle";
import { NewsResponse, NewsTargetModel, Permission } from "@api-server";
import { useNewsActions } from "@data-access";
import { useAppStore } from "@data-app";
import { RenderHTML } from "@feature-render-html";
import { mdiEyeOffOutline, mdiEyeOutline, mdiNewspaperVariantOutline, mdiPlus } from "@icons/material";
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
	const { success, result } = await fetchNewsPage({ limit: 1, skip: 0, unpublished: true });
	if (success && result) unpublishedTotal.value = result.data.total;
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

<style scoped>
.news-grid {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fill, minmax(min(420px, 100%), 1fr));
}

.news-card {
	min-width: 312px;
}

.news-card-title {
	color: rgba(var(--v-theme-on-surface)) !important;
}

.news-title {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	overflow: hidden;
}

.news-content {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	line-clamp: 3;
	overflow: hidden;
}
</style>
