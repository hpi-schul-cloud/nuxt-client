<template>
	<DefaultWireframe max-width="full" main-with-bottom-padding>
		<template #header>
			<h1 data-testid="dashboard-title">{{ t("pages.dashboard.title") }}</h1>
		</template>
		<template #default>
			<SvsLoadingSpinner :loading="isLoadingNews">
				<h2 class="mb-4">{{ t("pages.news.title") }}</h2>

				<!-- Dashboard news -->
				<EmptyState
					v-if="latestNews.length === 0"
					data-testid="empty-state-news"
					:title="t('pages.dashboard.empty.news')"
				>
					<template #media>
						<VImg height="160" src="@/assets/img/news-empty.svg" />
					</template>
				</EmptyState>
				<template v-else>
					<div class="grid-container mb-4">
						<VCard
							v-for="news in latestNews"
							:key="news.id"
							class="d-flex flex-column"
							:href="`/news/${news.id}`"
							data-testid="container_of_element"
							@dragstart.prevent
						>
							<VCardTitle class="bg-primary-lighten text-wrap" data-testid="news-header">
								<div class="d-flex align-center">
									<VIcon size="14" class="mr-1" :icon="mdiNewspaperVariantOutline" />
									<span class="text-sm font-weight-regular">{{ fromNowUtc(news.displayAt) }}</span>
								</div>
								<h3 class="text-h4 my-1 news-header-truncate" data-testid="title_of_an_element">{{ news.title }}</h3>
							</VCardTitle>
							<VCardText class="flex-grow-1 pt-3 text-md" data-testid="news-content">
								<div class="news-content-truncate"><RenderHTML :html="news.content" /></div>
							</VCardText>
						</VCard>
					</div>

					<VBtn href="/news" variant="outlined" :text="t('common.actions.show.all')" />
				</template>
			</SvsLoadingSpinner>

			<DashboardTasks v-if="isTeacher || isStudent" />

			<!-- Dashboard new release announcement      -->
			<SvsDialog
				:model-value="hasNewReleaseNotes"
				title="pages.dashboard.new.features.available"
				@cancel="setReleasePreferences"
			>
				<template #content>
					<div class="text-md">
						{{ t("pages.dashboard.new.features", { instanceTitle: envConfig.SC_TITLE }) }}
						{{ t("pages.dashboard.new.features.forward") }}
					</div>
					<VImg
						class="w-75 d-block mx-auto"
						src="@/assets/img/surprise.svg"
						alt=""
						role="presentation"
						max-width="360"
					/>
				</template>
				<template #actions>
					<VBtn
						class="w-100"
						color="primary"
						variant="flat"
						:text="t('common.labels.moreInfo')"
						href="/system/releases"
						@click="setReleasePreferences"
					/>
				</template>
			</SvsDialog>
		</template>
	</DefaultWireframe>
</template>

<script lang="ts" setup>
import { useSafeAxiosQuery, useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { fromNowUtc } from "@/utils/date-time.utils";
import { buildPageTitle } from "@/utils/pageTitle";
import { MeApiFactory, NewsApiFactory, ServerReleaseApiFactory } from "@api-server";
import { useAppStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import { RenderHTML } from "@feature-render-html";
import { mdiNewspaperVariantOutline } from "@icons/material";
import { SvsLoadingSpinner } from "@ui-containers";
import { DashboardTasks } from "@ui-dashboard";
import { SvsDialog } from "@ui-dialog";
import { EmptyState } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { isTeacher, isStudent, userPreferences } = useAppStoreRefs();
const envConfig = useEnvConfig();
const NEWS_LIMIT = 4;
const newsApi = NewsApiFactory(undefined, "/v3", $axios);
const meApi = MeApiFactory(undefined, "/v3", $axios);
const releasesApi = ServerReleaseApiFactory(undefined, "/v3", $axios);

useTitle(buildPageTitle(t("pages.dashboard.title")));
const { execute: setPreference } = useSafeAxiosTask();

/**
 * News
 */
const { data: newsResponse, isRunning: isLoadingNews } = useSafeAxiosQuery(() =>
	newsApi.newsControllerFindAll("schools", undefined, undefined, undefined, NEWS_LIMIT)
);
const latestNews = computed(() => newsResponse.value?.data.data ?? []);

/**
 * Releases
 */
const { data: releasesResponse } = useSafeAxiosQuery(() => releasesApi.serverReleaseControllerGetReleases(0, 1));
const latestRelease = computed(() => releasesResponse.value?.data.data?.[0]);

const hasNewReleaseNotes = computed(() => {
	if (!latestRelease.value) return false;
	const lastSeenDate = userPreferences.value?.releaseDate;
	return !lastSeenDate || new Date(lastSeenDate) < new Date(latestRelease.value.publishedAt);
});

const setReleasePreferences = () => {
	if (!latestRelease.value) return;

	setPreference(() =>
		meApi.meControllerUpdateMePreferences({
			releaseDate: latestRelease.value!.publishedAt,
		})
	);
};
</script>

<style lang="scss" scoped>
.grid-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
	gap: 1.5rem;
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
