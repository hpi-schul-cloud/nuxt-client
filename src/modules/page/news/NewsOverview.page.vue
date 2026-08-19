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
			<EmptyState v-if="newsList.length === 0" data-testid="empty-state-news" :title="t('pages.dashboard.empty.news')">
				<template #media>
					<SvgNewsEmpty />
				</template>
			</EmptyState>
			<template v-else>
				<NewsGrid class="mt-8" :news-items="newsList" />
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
import { Permission } from "@api-server";
import { useNewsOverview } from "@data-access";
import { useAppStore } from "@data-app";
import { NewsGrid } from "@feature-news";
import { mdiEyeOffOutline, mdiEyeOutline, mdiPlus } from "@icons/material";
import { SvsLoading } from "@ui-containers";
import { EmptyState } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const appStore = useAppStore();

const canCreateNews = computed(() => appStore.hasPermission(Permission.NEWS_CREATE).value);
const canEditNews = computed(() => appStore.hasPermission(Permission.NEWS_EDIT).value);

const { newsList, unpublishedTotal, activeTab, currentPage, pageCount, loadingState, onPageChange } = useNewsOverview({
	canEditNews,
});

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
</script>
