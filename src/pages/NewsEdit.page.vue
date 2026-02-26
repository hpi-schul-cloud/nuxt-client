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
			<FormNews
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
import { type UpdateNewsParams } from "@/serverApi/v3";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifyError } from "@data-app";
import { useNews } from "@data-news";
import { FormNews } from "@feature-news";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const { status, findOneNews, currentNews, updateNews, deleteNews } = useNews();

onMounted(async () => {
	await findOneNews(route.params.id as string);
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

	await updateNews({
		id: currentNews.value.id,
		title: newsToPatch.title,
		content: newsToPatch.content,
		displayAt: newsToPatch.displayAt,
	});

	if (status.value === "completed" && currentNews.value?.id)
		await router.push({ path: `/news/${currentNews.value.id}` });
};

const onDelete = async () => {
	if (!currentNews.value?.id) {
		notifyError(t("components.organisms.FormNews.error.remove"));
		return;
	}

	await deleteNews(currentNews.value.id);

	if (status.value === "completed") await router.push({ path: "/news" });
};

const onCancel = () => {
	router.go(-1);
};
</script>
