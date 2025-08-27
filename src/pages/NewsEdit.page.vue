<template>
	<div v-if="news">
		<default-wireframe
			:headline="$t('pages.news.edit.title.default')"
			:breadcrumbs="[
				{
					to: '/news',
					title: $t('pages.news.title'),
				},
				{
					to: `/news/${$route.params.id}`,
					title: news.title,
				},
				{
					title: $t('pages.news.edit.title.default'),
					disabled: true,
				},
			]"
			max-width="short"
		>
			<div>
				<form-news
					v-if="news"
					:news="news"
					@save="onSave"
					@delete="onDelete"
					@cancel="onCancel"
				/>
			</div>
		</default-wireframe>
	</div>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { AlertStatus } from "@/store/types/alert-payload";
import { News, PatchNewsPayload } from "@/store/types/news";
import {
	injectStrict,
	NEWS_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { FormNews } from "@feature-news-form";
import { useTitle } from "@vueuse/core";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const newsModule = injectStrict(NEWS_MODULE_KEY);
const news = ref<News | null>();

const fetchNews = async () => {
	await newsModule.fetchNews(route.params.id as string).then(() => {
		news.value = newsModule.getCurrentNews;
		setPageTitle();
	});
};
fetchNews();

const setPageTitle = () => {
	let pageTitle = t("pages.news.edit.title.default");
	if (news.value?.title) {
		pageTitle = t("pages.news.edit.title", {
			title: news.value?.title,
		});
	}
	useTitle(buildPageTitle(pageTitle));
};

const onSave = async (newsToPatch: Partial<PatchNewsPayload>) => {
	if (!news.value?.id) {
		showNotifier("error", "patch");
		return;
	}

	try {
		await newsModule.patchNews({
			id: news.value.id,
			title: newsToPatch.title,
			content: newsToPatch.content,
			displayAt: newsToPatch.displayAt,
		});

		showNotifier("success", "patch");

		await router.push({ path: `/news/${news.value?.id}` });
	} catch {
		showNotifier("error", "patch");
	}
};

const onDelete = async () => {
	if (!news.value?.id) {
		showNotifier("error", "remove");
		return;
	}

	try {
		await newsModule.removeNews(news.value.id);
		showNotifier("success", "remove");

		router.push({ path: "/news" });
	} catch {
		showNotifier("error", "remove");
	}
};

const onCancel = async () => {
	router.go(-1);
};

const showNotifier = (type: AlertStatus, method: "remove" | "patch") => {
	notifierModule.show({
		text: t(`components.organisms.FormNews.${type}.${method}`),
		status: type,
	});
};
</script>
