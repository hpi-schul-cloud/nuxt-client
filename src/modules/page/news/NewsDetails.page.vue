<template>
	<div v-if="currentNews">
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
			<h2 data-testid="news-title">{{ currentNews.title }}</h2>
			<div class="d-flex mb-2">
				<div class="d-flex align-center text-subtitle mr-3">
					<VIcon :icon="mdiClockOutline" size="sm" class="mr-1" />
					{{ createdAt }}
				</div>
				<div class="d-flex align-center text-subtitle">
					<VIcon :icon="mdiHumanMaleBoard" size="sm" class="mr-1" />
					{{ creator }}
				</div>
			</div>
			<VDivider class="mb-4" />
			<RenderHTML :html="currentNews?.content" class="ck-content" data-testid="news-content" />
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
		</DefaultWireframe>
	</div>
</template>

<script setup lang="ts">
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { formatUtc } from "@/utils/date-time.utils";
import { buildPageTitle } from "@/utils/pageTitle";
import { NewsApiFactory, NewsResponse } from "@api-server";
import { notifyError, notifySuccess } from "@data-app";
import { RenderHTML } from "@feature-render-html";
import { mdiClockOutline, mdiHumanMaleBoard } from "@icons/material";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const { execute } = useSafeAxiosTask();
const currentNews = ref<NewsResponse | undefined>(undefined);
const newsApi = NewsApiFactory(undefined, "/v3", $axios);

onMounted(async () => {
	const { result } = await execute(() => newsApi.newsControllerFindOne(route.params.id as string));
	currentNews.value = result?.data;

	useTitle(buildPageTitle(pageTitle.value));
});

const pageTitle = computed(() => {
	if (!currentNews.value?.createdAt) return t("pages.news.details.title.fallback");
	return t("pages.news.details.title", {
		date: formatUtc(currentNews.value.createdAt, "date"),
	});
});

const createdAt = computed(() => {
	if (!currentNews.value?.createdAt) return "";
	return formatUtc(currentNews.value.createdAt, "date");
});

const creator = computed(() => {
	if (!currentNews.value) return "";
	return `${currentNews.value.creator.firstName} ${currentNews.value.creator.lastName}`;
});

const onEdit = () => {
	router.push({ path: `/news/${currentNews.value?.id}/edit` });
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
</script>
