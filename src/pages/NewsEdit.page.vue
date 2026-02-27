<template>
	<div v-if="currentNews">
		<DefaultWireframe
			:headline="t('pages.news.edit.title.default')"
			:breadcrumbs="[
				{
					to: '/news',
					title: t('pages.news.title'),
				},
				{
					to: `/news/${route.params.id}`,
					title: currentNews.title,
				},
				{
					title: t('pages.news.edit.title.default'),
					disabled: true,
				},
			]"
			max-width="short"
		>
			<NewsForm
				:title="currentNews.title"
				:content="currentNews.content"
				:display-at="currentNews.displayAt"
				:status="status"
				show-delete-button
				@save="onSave"
				@delete="onDelete"
				@cancel="onCancel"
			/>
		</DefaultWireframe>
	</div>
</template>

<script setup lang="ts">
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { NewsApiFactory, NewsResponse, type UpdateNewsParams } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifyError, notifySuccess } from "@data-app";
import { NewsForm } from "@feature-news";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const { execute, status } = useSafeAxiosTask();
const currentNews = ref<NewsResponse | undefined>(undefined);
const newsApi = NewsApiFactory(undefined, "/v3", $axios);

onMounted(async () => {
	const { result } = await execute(() => newsApi.newsControllerFindOne(route.params.id as string));
	currentNews.value = result?.data;

	setPageTitle();
});

const setPageTitle = () => {
	let pageTitle = t("pages.news.edit.title.default");
	if (currentNews.value?.title) {
		pageTitle = t("pages.news.edit.title", {
			title: currentNews.value?.title,
		});
	}
	useTitle(buildPageTitle(pageTitle));
};

const onSave = async (newsToPatch: UpdateNewsParams) => {
	if (!currentNews.value?.id) {
		notifyError(t("components.organisms.FormNews.error.patch"));
		return;
	}

	const { result, success } = await execute(
		() => newsApi.newsControllerUpdate(currentNews.value!.id, newsToPatch),
		t("components.organisms.FormNews.error.patch")
	);
	if (!success) return;

	notifySuccess(t("components.organisms.FormNews.success.patch"));
	await router.push({ path: `/news/${result.data.id}` });
};

const onDelete = async () => {
	if (!currentNews.value?.id) {
		notifyError(t("components.organisms.FormNews.error.remove"));
		return;
	}
	const newsId = currentNews.value.id;

	const { success } = await execute(
		() => newsApi.newsControllerDelete(newsId),
		t("components.organisms.FormNews.error.remove")
	);
	if (!success) return;

	currentNews.value = undefined;
	notifySuccess(t("components.organisms.FormNews.success.remove"));
	await router.push({ path: "/news" });
};

const onCancel = () => {
	router.go(-1);
};
</script>
