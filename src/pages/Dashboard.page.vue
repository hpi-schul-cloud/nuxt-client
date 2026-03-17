<template>
	<DefaultWireframe max-width="full" :headline="t('pages.dashboard.title')" main-with-bottom-padding>
		<template #header>
			<section data-testid="welcome-section" class="py-4 text-center">
				<h1 class="text-h5 my-2">{{ t("pages.dashboard.welcome") }} {{ user?.firstName }} {{ user?.lastName }}!</h1>
			</section>

			<!--			<div v-if="config.FEATURE_DASHBOARD_DEFAULT_PICTURE_ENABLED" class="d-flex justify-center">-->
			<div class="d-flex mb-8 justify-center">
				<VImg src="@/assets/img/welcome.svg" alt="" role="presentation" max-width="600" />
			</div>
		</template>

		<template #default>
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
						<VCardTitle class="d-flex flex-column" data-testid="news-header">
							<span class="text-lg" data-testid="title_of_an_element">{{ news.title }}</span>
							<span class="text-md">{{ fromNowUtc(news.displayAt) }}</span>
						</VCardTitle>

						<VCardText class="flex-grow-1" data-testid="news-content">
							<RenderHTML class="ck-content mb-1" :html="news.content" />
						</VCardText>

						<VCardActions class="justify-end pr-4">
							<VBtn variant="text" :to="`/news/${news.id}`" rel="canonical">
								{{ t("common.labels.readmore") }}
							</VBtn>
						</VCardActions>
					</VCard>
				</div>

				<VBtn to="/news" variant="flat" :text="t('common.actions.show.all')" />
			</template>

			<!-- Teacher tasks  -->
			<template v-if="isTeacher">
				<!-- homework feedback required -->
				<DashboardTaskSection
					v-if="dashboardData?.homeworksFeedbackRequired && dashboardData?.homeworksFeedbackRequired?.length > 0"
					data-testid="tasks-with-required-feedback"
					:title="t('pages.dashboard.schedule.with.feedback')"
					:tasks="dashboardData.homeworksFeedbackRequired"
					href="/tasks"
				/>

				<!-- assigned homework -->
				<DashboardTaskSection
					v-if="dashboardData?.assignedHomeworks && dashboardData?.assignedHomeworks?.length > 0"
					data-testid="tasks-with-required-feedback"
					:title="t('common.labels.tasks.assigned')"
					:tasks="dashboardData.assignedHomeworks"
					href="/tasks"
				/>
			</template>

			<!--      {{#if assignedHomeworks}}-->
			<!--      {{> 'dashboard/components/homework_tiles' section-id="published-tasks" title=($t "global.headline.assignedTasks") content=assignedHomeworks href="/tasks"}}-->
			<!--      {{else}}-->
			<!--      <section class="section mb-2">-->
			<!--        <div class="row">-->
			<!--          <div class="col-sm-12">-->
			<!--            <h2 class="h5 mb-1 mt-2"><a class="dashboard-title" href="/tasks">{{$t "global.headline.tasks"}}</a></h2>-->
			<!--          </div>-->
			<!--        </div>-->
			<!--        <div class="row d-block text-center">-->
			<!--          <div class="empty-state">-->
			<!--            <div class="col-sm-12">-->
			<!--              <div class="image center">-->
			<!--                {{> 'courses/components/svg_tasks' }}-->
			<!--              </div>-->
			<!--              <p class="text-muted dashboard-empty-info">-->
			<!--                {{$t "dashboard.text.emptyHomeworksInfo"}}-->
			<!--              </p>-->
			<!--            </div>-->
			<!--          </div>-->
			<!--        </div>-->
			<!--      </section>-->
			<!--      {{/if}}-->

			<!--      {{#if privateHomeworks}}-->
			<!--      {{> 'dashboard/components/homework_tiles' section-id="private-tasks" title=($t "global.headline.draftTasks") content=privateHomeworks href="/tasks"}}-->
			<!--      {{/if}}-->

			<!--      {{else if isStudent}}-->
			<!--      {{#if assignedHomeworks}}-->
			<!--      {{> 'dashboard/components/homework_tiles' section-id="published-tasks" title=($t "global.headline.assignedTasks") content=assignedHomeworks href="/tasks"}}-->
			<!--      {{else}}-->
			<!--      <section class="section mb-2">-->
			<!--        <div class="row">-->
			<!--          <div class="col-sm-12">-->
			<!--            <h2 class="h5 mb-1 mt-2"><a class="dashboard-title" href="/tasks">{{$t "global.headline.tasks"}}</a></h2>-->
			<!--          </div>-->
			<!--        </div>-->
			<!--        <div class="row d-block text-center">-->
			<!--          <div class="col-sm-12">-->
			<!--            <div class="empty-state">-->
			<!--              <div class="image center">-->
			<!--                {{> 'courses/components/svg_tasks' }}-->
			<!--              </div>-->
			<!--              <p class="text-muted dashboard-empty-info">-->
			<!--                {{$t "dashboard.text.emptyHomeworksInfo"}}-->
			<!--              </p>-->
			<!--            </div>-->
			<!--          </div>-->
			<!--        </div>-->
			<!--      </section>-->
			<!--      {{/if}}-->

			<!--      {{#if homeworksWithFeedback}}-->
			<!--      {{> 'dashboard/components/homework_tiles' section-id="tasks-with-feedback" title=($t "dashboard.headline.withFeedback") content=homeworksWithFeedback href="/tasks" redirectToTab="feedback"}}-->
			<!--      {{/if}}-->
			<!--      {{/if}}-->

			<!--      {{#unless (getConfig "FEATURE_DASHBOARD_NEWS_ON_TOP_ENABLED")}}-->
			<!--      {{#if news}}-->
			<!--      {{>  'dashboard/components/card_section' section-id="news" title=($t "global.headline.news") content=news link-text=($t "dashboard.link.continueReading") href="/news/"}}-->
			<!--      {{else}}-->
			<!--      <section data-testid="news-section" class="section section-news mb-2">-->
			<!--        <div class="row">-->
			<!--          <div class="col-sm-12">-->
			<!--            <h2 class="h5 mb-1 mt-2"><a class="dashboard-title" href="/news/">{{$t "global.headline.news"}}</a></h2>-->
			<!--          </div>-->
			<!--        </div>-->
			<!--        <div class="row d-block text-center">-->
			<!--          <div class="empty-state">-->
			<!--            <div class="image center">-->
			<!--              <img src="{{getAssetPath '/images/dashboard/news-empty.svg'}}" alt="" role="presentation" class="image" />-->
			<!--            </div>-->
			<!--            <p class="text-muted dashboard-empty-info">-->
			<!--              {{$t "dashboard.text.emptyNewsInfo"}}-->
			<!--            </p>-->
			<!--          </div>-->
			<!--        </div>-->
			<!--      </section>-->
			<!--      {{/if}}-->
			<!--      {{/unless}}-->

			<!--      {{#if this.currentSchoolData.pilot}}-->
			<!--      {{#ifneq this.currentRole "Schüler"}}-->
			<!--      {{#embed "lib/components/modal" class="poll-modal"}}-->
			<!--      {{#content "body"}}-->
			<!--      {{> "lib/forms/form-poll"}}-->
			<!--      {{/content}}-->
			<!--      {{/embed}}-->
			<!--      {{/ifneq}}-->
			<!--      {{/if}}-->

			<!-- Dashboard new release announcement      -->
			<template v-if="dashboardData?.showNewReleaseModal">
				<SvsDialog :model-value="true" title="pages.dashboard.new.features.available">
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
		</template>
	</DefaultWireframe>
</template>
<script lang="ts" setup>
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { fromNowUtc } from "@/utils/date-time.utils";
import { NewsApiFactory, NewsResponse } from "@api-server";
import { useAppStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import { RenderHTML } from "@feature-render-html";
import { DashBoardResponse, DashboardTaskSection } from "@ui-dashboard";
import { SvsDialog } from "@ui-dialog";
import { EmptyState } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { user, isTeacher, isStudent } = useAppStoreRefs();
const envConfig = useEnvConfig();

const latestNews = ref<NewsResponse[]>([]);
const dashboardData = ref<DashBoardResponse>();
const newsApi = NewsApiFactory(undefined, "/v3", $axios);

const { execute } = useSafeAxiosTask();

onMounted(async () => {
	const { result, success } = await execute(
		async () => await newsApi.newsControllerFindAll("schools", undefined, undefined, undefined, 3)
	);
	if (!success) return;
	latestNews.value = result.data.data;

	const { result: resultDb, success: successDb } = await execute(
		async () =>
			await $axios.get("/dashboard/myFriend", {
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

.ck-content {
	overflow: hidden; // prevent margin collapse
}
</style>
