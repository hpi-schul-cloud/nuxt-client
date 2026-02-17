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
			<FormNews :status="status" @save="create" @cancel="onCancel" />
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { CreateNewsParams, CreateNewsParamsTargetModelEnum } from "@/serverApi/v3";
import { Status } from "@/store/types/commons";
import { injectStrict, NEWS_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifyError, notifySuccess, useAppStore } from "@data-app";
import { FormNews } from "@feature-news";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { LocationQuery, LocationQueryValue, useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const newsModule = injectStrict(NEWS_MODULE_KEY);

const status = computed(() => newsModule.getStatus as Status);
const createdNews = computed(() => newsModule.getCreatedNews);

const pageTitle = computed(() => buildPageTitle(`${t("pages.news.new.title")}`));
useTitle(pageTitle);

const parseNewstarget = (
	targetId: LocationQueryValue | LocationQueryValue[],
	targetModel: LocationQueryValue | LocationQueryValue[]
) => {
	if (
		targetId &&
		typeof targetId === "string" &&
		targetModel &&
		typeof targetModel === "string"
		// Object.values(CreateNewsParamsTargetModelEnum).includes(targetModel as CreateNewsParamsTargetModelEnum) // Todo: think about improvement error handling if targetModel (context) is invalid
	) {
		return { targetId, targetModel: targetModel as CreateNewsParamsTargetModelEnum };
	} else {
		return undefined;
	}
};

const getNewsTarget = (
	query: LocationQuery,
	schoolId: string | undefined
): Pick<CreateNewsParams, "targetId" | "targetModel"> =>
	parseNewstarget(query.target, query.targetmodel) ??
	parseNewstarget(query.contextId, query.context) ?? {
		targetId: schoolId ?? "",
		targetModel: CreateNewsParamsTargetModelEnum.Schools,
	};

const create = async (news: Pick<CreateNewsParams, "title" | "content" | "displayAt">) => {
	try {
		const newsTarget = getNewsTarget(route.query, useAppStore()?.school?.id);
		await newsModule.createNews({
			title: news.title,
			content: news.content,
			displayAt: news.displayAt,
			targetId: newsTarget.targetId,
			targetModel: newsTarget.targetModel,
		});
		if (status.value === "completed") {
			notifySuccess(t("components.organisms.FormNews.success.create"));
			await router.push({
				path: `/news/${createdNews.value.id}`,
			});
		}
	} catch {
		notifyError(t("components.organisms.FormNews.errors.create"));
	}
};

const onCancel = () => {
	router.go(-1);
};
</script>
