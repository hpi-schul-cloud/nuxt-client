<template>
	<DefaultWireframe
		:headline="pageTitle"
		:breadcrumbs="[
			{
				href: '/news',
				title: t('pages.news.title'),
			},
			{
				title: pageTitle,
				disabled: true,
			},
		]"
		max-width="short"
	>
		<SvsLoading :is-loading="isLoadingNews">
			<template v-if="newsInstance">
				<h2 data-testid="news-title">{{ newsInstance.title }}</h2>
				<div class="d-flex mb-2">
					<div class="d-flex align-center text-subtitle mr-3" data-testid="news-last-touched">
						<VIcon :icon="mdiClockOutline" size="sm" class="mr-1" />
						{{ displayedDateText }}
					</div>
					<div class="d-flex align-center text-subtitle" data-testid="news-creator">
						<VIcon :icon="mdiHumanMaleBoard" size="sm" class="mr-1" />
						{{ creator }}
					</div>
				</div>
				<VDivider class="mb-4" />
				<RenderHTML :html="newsInstance.content" class="ck-content" data-testid="news-content" />
				<div v-if="isTeacher || isAdmin" class="d-flex mt-8 ga-3">
					<VSpacer />
					<VBtn data-testid="news-delete-btn" :text="t('common.actions.delete')" variant="text" @click="onDelete" />
					<VBtn
						data-testid="news-edit-btn"
						:text="t('common.actions.edit')"
						color="primary"
						variant="flat"
						@click="onEdit"
					/>
				</div>
			</template>
			<template v-else>
				<EmptyState
					data-testid="empty-state-news"
					class="mt-16"
					:title="t('common.notifications.errors.notLoaded', { type: t('common.words.news') })"
				>
					<template #media>
						<SvgNewsEmpty />
					</template>
					<template #text>
						<VBtn to="/news" :text="t('common.labels.backToOverview')" color="primary" flat />
					</template>
				</EmptyState>
			</template>
		</SvsLoading>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import SvgNewsEmpty from "@/assets/img/SvgNewsEmpty.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useNews, useNewsActions } from "@data-access";
import { notifySuccess, useAppStoreRefs } from "@data-app";
import { RenderHTML } from "@feature-render-html";
import { mdiClockOutline, mdiHumanMaleBoard } from "@icons/material";
import { SvsLoading } from "@ui-containers";
import { EmptyState } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const newsId = computed(() => route.params.id as string | undefined);
const { deleteNews } = useNewsActions();
const { newsInstance, displayAtFormattedStandard, displayAtFormattedFromNow, creator, isLoadingNews } = useNews(newsId);

const { isTeacher, isAdmin } = useAppStoreRefs();

const pageTitle = computed(() => {
	if (!displayAtFormattedStandard.value) return t("pages.news.details.title.fallback");
	return t("pages.news.details.title", {
		date: displayAtFormattedStandard.value,
	});
});

const displayedDateText = computed(() => {
	if (!newsInstance.value?.displayAt) return undefined;
	return t("pages.news.details.published", { date: displayAtFormattedFromNow.value });
});

const onEdit = () => {
	router.push({ path: `/news/${newsId.value}/edit` });
};

const onDelete = async () => {
	const { success } = await deleteNews(newsId.value);
	if (success) {
		notifySuccess(t("components.organisms.FormNews.success.remove"));
		await router.push({ path: "/news" });
	}
};

watch(
	pageTitle,
	(newTitle) => {
		useTitle(buildPageTitle(newTitle));
	},
	{ immediate: true }
);
</script>
