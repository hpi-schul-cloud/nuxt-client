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
			<FormNews :status="status" @save="onCreate" @cancel="onCancel" />
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { CreateNewsParams, CreateNewsParamsTargetModelEnum } from "@/serverApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { buildPageTitle } from "@/utils/pageTitle";
import { useAppStore } from "@data-app";
import { useNews } from "@data-news";
import { FormNews } from "@feature-news";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { type LocationQueryValue, useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const { status, createdNews, createNews } = useNews();

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
	await createNews({
		title: news.title,
		content: news.content,
		displayAt: news.displayAt,
		targetId: newsTarget.targetId,
		targetModel: newsTarget.targetModel,
	});

	if (status.value === "completed" && createdNews.value?.id) {
		await router.push({
			path: `/news/${createdNews.value.id}`,
		});
	}
};

const onCancel = () => {
	router.go(-1);
};
</script>
