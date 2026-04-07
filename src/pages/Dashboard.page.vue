<template>
	<DefaultWireframe max-width="full" main-with-bottom-padding>
		<template #header>
			<h1 data-testid="dashboard-title">{{ t("pages.dashboard.title") }}</h1>
		</template>
		<template #default>
			<InfoAlert v-if="hasGlobalAnnouncement" class="mt-6">
				<i18n-t keypath="loggedin.text.backupFeatures" scope="global">
					<template #helpLink>
						<a href="https://dbildungscloud.de/help/confluence/485132545" target="_blank" rel="noopener noreferrer">
							{{ t("loggedin.text.backupFeatures.helpLink") }}
						</a>
					</template>
				</i18n-t>
			</InfoAlert>

			<SvsSuspense :loading="isLoadingNews">
				<h2 class="mb-4">{{ t("pages.news.title") }}</h2>

				<!-- Dashboard news -->
				<EmptyState
					v-if="latestNews.length === 0"
					data-testid="empty-state-news"
					:title="t('pages.dashboard.empty.news')"
				>
					<template #media>
						<SvgNewsEmpty />
					</template>
				</EmptyState>
				<template v-else>
					<div class="grid-container mb-4" data-testid="news-section">
						<VCard
							v-for="news in latestNews"
							:key="news.id"
							class="d-flex flex-column grid-item"
							:href="`/news/${news.id}`"
							data-testid="news-card-item"
							@dragstart.prevent
						>
							<VCardTitle class="bg-primary-lighten text-wrap" data-testid="news-header">
								<div class="d-flex align-center">
									<VIcon size="14" class="mr-1" :icon="mdiNewspaperVariantOutline" />
									<span class="text-sm font-weight-regular">{{ fromNowUtc(news.displayAt) }}</span>
								</div>
								<h3 class="text-h4 my-1 news-header-truncate" data-testid="news-title">{{ news.title }}</h3>
							</VCardTitle>
							<VCardText class="flex-grow-1 pt-3 text-md" data-testid="news-content">
								<div class="news-content-truncate"><RenderHTML :html="news.content" /></div>
							</VCardText>
						</VCard>
					</div>

					<VBtn href="/news" data-testid="show-all-news" variant="outlined" :text="t('common.actions.show.all')" />
				</template>
			</SvsSuspense>

			<DashboardTasks v-if="isTeacher || isStudent" />

			<DashboardReleaseDialog />
		</template>
	</DefaultWireframe>
</template>

<script lang="ts" setup>
import SvgNewsEmpty from "@/assets/img/SvgNewsEmpty.vue";
import { useSafeAxiosRunner } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { fromNowUtc } from "@/utils/date-time.utils";
import { buildPageTitle } from "@/utils/pageTitle";
import { NewsApiFactory, SchulcloudTheme } from "@api-server";
import { useAppStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import { DashboardReleaseDialog, DashboardTasks } from "@feature-dashboard";
import { RenderHTML } from "@feature-render-html";
import { mdiNewspaperVariantOutline } from "@icons/material";
import { InfoAlert } from "@ui-alert";
import { SvsSuspense } from "@ui-containers";
import { EmptyState } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { isTeacher, isStudent } = useAppStoreRefs();
const NEWS_LIMIT = 4;
const newsApi = NewsApiFactory(undefined, "/v3", $axios);

useTitle(buildPageTitle(t("pages.dashboard.title")));

const { data: newsResponse, isRunning: isLoadingNews } = useSafeAxiosRunner(() =>
	newsApi.newsControllerFindAll("schools", undefined, undefined, undefined, NEWS_LIMIT)
);
const latestNews = computed(() => newsResponse.value?.data.data ?? []);

const envConfig = useEnvConfig();
// Workaround, since accessing the same parameters is in progress.
const hasGlobalAnnouncement = computed(() => envConfig.value.SC_THEME === SchulcloudTheme.DEFAULT);
</script>

<style scoped>
.grid-container {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fill, minmax(min(420px, 100%), 1fr));
}
.grid-item {
	min-width: 312px; /* Minimum supported screen width (360px) minus horizontal padding (48px) */
}

.v-card-title {
	color: rgba(var(--v-theme-on-surface)) !important;
}

.news-header-truncate {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	overflow: hidden;
}

.news-content-truncate {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	line-clamp: 3;
	overflow: hidden;
}
</style>
