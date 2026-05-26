<template>
	<DefaultWireframe
		v-if="newsInstance"
		:headline="t('pages.news.edit.title.default')"
		:breadcrumbs="[
			{
				to: '/news',
				title: t('pages.news.title'),
			},
			{
				to: `/news/${route.params.id}`,
				title: titleForBreadcrumbs,
			},
			{
				title: t('pages.news.edit.title.default'),
				disabled: true,
			},
		]"
		max-width="short"
	>
		<NewsForm
			:title="newsInstance.title"
			:content="newsInstance.content"
			:display-at="newsInstance.displayAt"
			:status="status"
			show-delete-button
			@save="onSave"
			@delete="onDelete"
			@cancel="onCancel"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { buildPageTitle } from "@/utils/pageTitle";
import { type UpdateNewsParams } from "@api-server";
import { useNews, useNewsActions } from "@data-access";
import { notifySuccess } from "@data-app";
import { NewsForm } from "@feature-news";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const { saveNews, deleteNews, status } = useNewsActions();
const newsId = computed(() => route.params.id as string | undefined);
const { newsInstance, displayAtFormattedStandard } = useNews(newsId);

const pageTitle = computed(() => {
	if (!newsInstance.value?.title) return t("pages.news.edit.title.default");
	return t("pages.news.edit.title", {
		title: newsInstance.value?.title,
	});
});

const titleForBreadcrumbs = computed(() => {
	if (!newsInstance.value?.createdAt) return t("pages.news.details.title.fallback");
	return t("pages.news.details.title", {
		date: displayAtFormattedStandard.value,
	});
});

const onSave = async (newsToPatch: UpdateNewsParams) => {
	const { success, result } = await saveNews(newsId.value, newsToPatch);

	if (success) {
		notifySuccess(t("components.organisms.FormNews.success.patch"));
		await router.push({ path: `/news/${result?.data.id}` });
	}
};

const onDelete = async () => {
	const { success } = await deleteNews(newsInstance.value?.id);
	if (success) {
		notifySuccess(t("components.organisms.FormNews.success.remove"));
		await router.push({ path: "/news" });
	}
};

const onCancel = () => {
	router.go(-1);
};

watch(
	pageTitle,
	(newTitle) => {
		useTitle(buildPageTitle(newTitle));
	},
	{ immediate: true }
);
</script>
