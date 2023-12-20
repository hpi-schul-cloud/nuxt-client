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
			:full-width="false"
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
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { useTitle } from "@vueuse/core";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import FormNews from "@/components/organisms/FormNews.vue";
import { newsModule } from "@/store";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

const fetchNews = async () => {
	await newsModule.fetchNews(route.params.id as string);
};
fetchNews();

const news = computed(() => newsModule.getCurrentNews);

let pageTitle = t("pages.news.edit.title.default");
if (news.value?.title) {
	pageTitle = t("pages.news.edit.title", {
		title: news.value?.title,
	});
}
useTitle(buildPageTitle(pageTitle));

const onSave = async (newsToPatch: any) => {
	if (!news.value?.id) {
		notifierModule.show({
			text: t("components.organisms.FormNews.errors.patch"),
			status: "error",
			timeout: 10000,
		});
		return;
	}

	try {
		await newsModule.patchNews({
			id: news.value.id,
			title: newsToPatch.title,
			content: newsToPatch.content,
			displayAt: newsToPatch.displayAt,
		});

		notifierModule.show({
			text: t("components.organisms.FormNews.success.patch"),
			status: "success",
			timeout: 10000,
		});

		await router.push({ path: `/news/${news.value?.id}` });
	} catch (e) {
		notifierModule.show({
			text: t("components.organisms.FormNews.errors.patch"),
			status: "error",
			timeout: 10000,
		});
	}
};

const onDelete = async () => {
	if (!news.value?.id) {
		notifierModule.show({
			text: t("components.organisms.FormNews.errors.remove"),
			status: "error",
			timeout: 10000,
		});
		return;
	}

	try {
		await newsModule.removeNews(news.value.id);

		notifierModule.show({
			text: t("components.organisms.FormNews.success.remove"),
			status: "success",
			timeout: 10000,
		});
		router.push({ path: "/news" });
	} catch (e) {
		notifierModule.show({
			text: t("components.organisms.FormNews.errors.remove"),
			status: "error",
			timeout: 10000,
		});
	}
};

const onCancel = async () => {
	router.push({ path: `/news/${route.params.id}` });
};

// validate({ params }) {
// 	return /^[a-z0-9]{24}$/.test(params.id);
// },
</script>
