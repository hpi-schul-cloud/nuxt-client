<template>
	<DefaultWireframe max-width="full" main-with-bottom-padding>
		<template #header>
			<h1 data-testid="dashboard-title">{{ t("pages.dashboard.title") }}</h1>
		</template>
		<template v-if="dashboardData && status === 'completed'" #default>
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
						:to="`/news/${news.id}`"
						data-testid="container_of_element"
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

						<VCardActions class="justify-end pr-4 mt-2">
							<VBtn class="text-primary" variant="text" :to="`/news/${news.id}`" rel="canonical">
								{{ t("common.labels.readmore") }}
							</VBtn>
						</VCardActions>
					</VCard>
				</div>

				<VBtn to="/news" variant="flat" :text="t('common.actions.show.all')" />
			</template>

			<!-- Teacher tasks -->
			<template v-if="isTeacher">
				<!-- Tasks Feedback required -->
				<DashboardTasksSection
					v-if="dashboardData?.homeworksFeedbackRequired?.length > 0"
					data-testid="tasks-with-required-feedback"
					:title="t('pages.dashboard.schedule.with.feedback')"
					:tasks="dashboardData.homeworksFeedbackRequired"
				/>

				<DashboardAssignedTasks :assigned-tasks="dashboardData?.assignedHomeworks" />

				<!-- Tasks Private -->
				<DashboardTasksSection
					v-if="dashboardData?.privateHomeworks?.length > 0"
					data-testid="tasks-private"
					:title="t('common.words.drafts')"
					:tasks="dashboardData.privateHomeworks"
				/>
			</template>

			<!-- Student tasks -->
			<template v-else-if="isStudent">
				<DashboardAssignedTasks :assigned-tasks="dashboardData?.assignedHomeworks" />

				<!-- Tasks with feedback -->
				<DashboardTasksSection
					v-if="dashboardData?.homeworksWithFeedback?.length > 0"
					data-testid="tasks-with-feedback"
					:title="t('pages.dashboard.schedule.with.feedback')"
					:tasks="dashboardData.homeworksWithFeedback"
				/>
			</template>

			<!-- Dashboard new release announcement      -->
			<SvsDialog
				v-if="dashboardData?.showNewReleaseModal"
				:model-value="true"
				title="pages.dashboard.new.features.available"
			>
				<template #content>
					<VImg
						class="w-75 d-block mx-auto"
						src="@/assets/img/surprise.gif"
						alt=""
						role="presentation"
						max-width="360"
					/>
					<div class="text-md text-center">
						<div>{{ t("pages.dashboard.new.features", { instanceTitle: envConfig.SC_TITLE }) }}</div>
						<div>{{ t("pages.dashboard.new.features.forward") }}</div>
					</div>
				</template>
				<template #actions>
					<VBtn
						class="w-100"
						color="primary"
						variant="flat"
						:text="t('common.actions.click.here')"
						to="/system/releases"
					/>
				</template>
			</SvsDialog>
		</template>
	</DefaultWireframe>
</template>
<script lang="ts" setup>
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { fromNowUtc } from "@/utils/date-time.utils";
import { buildPageTitle } from "@/utils/pageTitle";
import { NewsApiFactory, NewsResponse, SchulcloudTheme } from "@api-server";
import { useAppStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import { RenderHTML } from "@feature-render-html";
import { mdiNewspaperVariantOutline } from "@icons/material";
import { DashboardAssignedTasks, DashBoardResponse, DashboardTasksSection } from "@ui-dashboard";
import { SvsDialog } from "@ui-dialog";
import { EmptyState } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { user, isTeacher, isStudent } = useAppStoreRefs();
const envConfig = useEnvConfig();

const isDefaultTheme = computed(() => envConfig.value.SC_THEME === SchulcloudTheme.DEFAULT);

const latestNews = ref<NewsResponse[]>([]);
const dashboardData = ref<DashBoardResponse>();
const NEWS_LIMIT = 4;
const newsApi = NewsApiFactory(undefined, "/v3", $axios);

const { execute, status } = useSafeAxiosTask();

useTitle(buildPageTitle(t("pages.dashboard.title")));
onMounted(async () => {
	const { result, success } = await execute(
		async () => await newsApi.newsControllerFindAll("schools", undefined, undefined, undefined, NEWS_LIMIT)
	);
	if (!success) return;
	latestNews.value = result.data.data ?? [];

	const { result: resultDb, success: successDb } = await execute(
		async () =>
			await $axios.get("/bff/dashboard", {
				baseURL: "/",
			})
	);

	if (!successDb) return;
	dashboardData.value = resultDb.data as unknown as DashBoardResponse;
});
</script>

<style lang="scss" scoped>
.grid-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
	gap: 1.5rem;
}

.news-content-truncate {
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	max-height: 5rem;
}

.news-header-truncate {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	max-height: 4rem;
}
</style>
