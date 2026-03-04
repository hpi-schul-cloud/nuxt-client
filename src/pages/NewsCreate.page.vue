<template>
	<DefaultWireframe
		:headline="t('pages.news.new.title')"
		:breadcrumbs="[
			{
				to: '/news',
				title: t('pages.news.title'),
			},
			{
				title: t('pages.news.new.title'),
				disabled: true,
			},
		]"
		max-width="short"
	>
		<div>
			<NewsForm :status="status" @save="onCreate" @cancel="onCancel" />
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { CreateNewsParams, CreateNewsParamsTargetModelEnum, NewsApiFactory } from "@/serverApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { $axios } from "@/utils/api";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifySuccess, useAppStore } from "@data-app";
import { NewsForm } from "@feature-news";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { type LocationQueryValue, useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const { execute, status } = useSafeAxiosTask();
const newsApi = NewsApiFactory(undefined, "/v3", $axios);

const pageTitle = computed(() => buildPageTitle(`${t("pages.news.new.title")}`));
useTitle(pageTitle);

onMounted(() => {
	if (!newsTargetFromQueryParams.value) return;

	const { targetId, targetModel } = newsTargetFromQueryParams.value;
	const areQueryParamsValid =
		targetId &&
		typeof targetId === "string" &&
		Object.values(CreateNewsParamsTargetModelEnum).includes(targetModel as CreateNewsParamsTargetModelEnum);

	if (!areQueryParamsValid) useAppStore().handleApplicationError(HttpStatusCode.BadRequest);
});

const newsTargetFromQueryParams = computed(() => {
	const { target, targetmodel, context, contextId } = route.query;

	return parseNewsTarget(target, targetmodel) ?? parseNewsTarget(contextId, context);
});

const parseNewsTarget = (
	targetId: LocationQueryValue | LocationQueryValue[],
	targetModel: LocationQueryValue | LocationQueryValue[]
): Pick<CreateNewsParams, "targetId" | "targetModel"> | undefined => {
	if (targetModel && typeof targetModel === "string") {
		return { targetId: targetId as string, targetModel: targetModel as CreateNewsParamsTargetModelEnum };
	} else {
		return undefined;
	}
};

const onCreate = async (news: Pick<CreateNewsParams, "title" | "content" | "displayAt">) => {
	const newsTarget = newsTargetFromQueryParams.value ?? {
		targetId: useAppStore()?.school?.id ?? "",
		targetModel: CreateNewsParamsTargetModelEnum.Schools,
	};

	const { result, success } = await execute(
		() =>
			newsApi.newsControllerCreate({
				title: news.title,
				content: news.content,
				displayAt: news.displayAt,
				targetId: newsTarget.targetId,
				targetModel: newsTarget.targetModel,
			}),
		t("components.organisms.FormNews.errors.create")
	);
	if (!success) return;

	notifySuccess(t("components.organisms.FormNews.success.create"));
	await router.push({ path: `/news/${result.data.id}` });
};

const onCancel = () => {
	router.go(-1);
};
</script>
