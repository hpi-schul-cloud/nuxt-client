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
					to: `/news/${$route.params.id}`,
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
				v-if="currentNews"
				:title="currentNews?.title"
				:content="currentNews?.content"
				:display-at="currentNews?.displayAt"
				:show-delete-button="!!currentNews?.id"
				:status="status"
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
import { type AlertStatus, useNotificationStore } from "@data-app";
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

const { status, fetchNews, current: currentNews, patchNews, removeNews } = useNews();

onMounted(async () => {
	await fetchNews(route.params.id as string);
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
		showNotifier("error", "patch");
		return;
	}

	try {
		await patchNews({
			id: currentNews.value.id,
			title: newsToPatch.title,
			content: newsToPatch.content,
			displayAt: newsToPatch.displayAt,
		});

		showNotifier("success", "patch");

		await router.push({ path: `/news/${currentNews.value?.id}` });
	} catch {
		showNotifier("error", "patch");
	}
};

const onDelete = async () => {
	if (!currentNews.value?.id) {
		showNotifier("error", "remove");
		return;
	}

	try {
		await removeNews(currentNews.value.id);
		showNotifier("success", "remove");

		router.push({ path: "/news" });
	} catch {
		showNotifier("error", "remove");
	}
};

const onCancel = () => {
	router.go(-1);
};

const showNotifier = (status: AlertStatus, method: "remove" | "patch") => {
	useNotificationStore().notify({
		text: t(`components.organisms.FormNews.${status}.${method}`),
		status,
	});
};
</script>
