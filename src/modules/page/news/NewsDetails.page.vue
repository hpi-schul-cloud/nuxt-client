<template>
	<DefaultWireframe
		v-if="newsInstance"
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
		<SvsSuspense :loading="isLoadingNews">
			<h2 data-testid="news-title">{{ newsInstance.title }}</h2>
			<div class="d-flex mb-2">
				<div class="d-flex align-center text-subtitle mr-3">
					<VIcon :icon="mdiClockOutline" size="sm" class="mr-1" />
					{{ lastTouched }}
				</div>
				<div class="d-flex align-center text-subtitle">
					<VIcon :icon="mdiHumanMaleBoard" size="sm" class="mr-1" />
					{{ creator }}
				</div>
			</div>
			<VDivider class="mb-4" />
			<RenderHTML :html="newsInstance?.content" class="ck-content" data-testid="news-content" />
			<div class="d-flex mt-8 ga-3">
				<VBtn
					data-testid="news-edit-btn"
					:text="t('common.actions.edit')"
					color="primary"
					variant="flat"
					@click="onEdit"
				/>
				<VBtn data-testid="news-delete-btn" :text="t('common.actions.delete')" variant="outlined" @click="onDelete" />
			</div>
		</SvsSuspense>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { formatUtc } from "@/utils/date-time.utils";
import { buildPageTitle } from "@/utils/pageTitle";
import { useNews, useNewsActions } from "@data-access";
import { notifySuccess } from "@data-app";
import { RenderHTML } from "@feature-render-html";
import { mdiClockOutline, mdiHumanMaleBoard } from "@icons/material";
import { SvsSuspense } from "@ui-containers";
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
const { newsInstance, lastTouched, creator, isLoadingNews } = useNews(newsId);

const pageTitle = computed(() => {
	if (!newsInstance.value?.createdAt) return t("pages.news.details.title.fallback");
	return t("pages.news.details.title", {
		date: formatUtc(newsInstance.value.createdAt, "date"),
	});
});

const onEdit = () => {
	router.push({ path: `/news/${newsInstance.value?.id}/edit` });
};

const onDelete = async () => {
	await deleteNews(newsInstance.value?.id);
	notifySuccess(t("components.organisms.FormNews.success.remove"));
	await router.push({ path: "/news" });
};

watch(pageTitle, (newTitle) => {
	useTitle(buildPageTitle(newTitle));
});
</script>
