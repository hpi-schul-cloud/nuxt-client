import { useSafeAxiosRunner, useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { askConfirmation } from "@/utils/confirmation-dialog.utils";
import { diff, formatUtc, fromNowUtc } from "@/utils/date-time.utils";
import { NewsApiFactory, NewsResponse, type UpdateNewsParams } from "@api-server";
import { notifyError } from "@data-app";
import dayjs from "dayjs";
import { computed, Ref, ref, watch } from "vue";

export const useNewsActions = () => {
	const newsApi = NewsApiFactory(undefined, "/v3", $axios);

	const { t } = useI18nGlobal();

	const { execute, status, error, isRunning: isLoading } = useSafeAxiosTask();

	const fetchNewsList = async (newsLimit: number) =>
		await execute(
			() => newsApi.newsControllerFindAll(undefined, undefined, undefined, undefined, newsLimit),
			t("common.notifications.errors.notLoaded", { type: t("common.words.news", 2) })
		);

	const fetchNews = async (newsId: string) =>
		await execute(
			() => newsApi.newsControllerFindOne(newsId),
			t("common.notifications.errors.notLoaded", { type: t("common.words.news") })
		);

	const saveNews = async (newsId: string | undefined, newsParams: UpdateNewsParams) => {
		if (!newsId) {
			notifyError(t("common.notifications.errors.notSaved", { type: t("common.words.news") }));
			return { success: false, result: undefined };
		}

		return await execute(
			() => newsApi.newsControllerUpdate(newsId, newsParams),
			t("common.notifications.errors.notSaved", { type: t("common.words.news") })
		);
	};

	const deleteNews = async (newsId: string | undefined) => {
		if (!newsId) {
			notifyError(t("common.notifications.errors.notDeleted", { type: t("common.words.news") }));
			return { success: false };
		}

		const isConfirmed = await askConfirmation({
			title: "components.organisms.FormNews.remove.confirm.message",
			confirmBtnKey: "components.organisms.FormNews.remove.confirm.confirm",
		});

		if (!isConfirmed) return { success: false, error: new Error("Deletion cancelled") };

		return await execute(
			() => newsApi.newsControllerDelete(newsId),
			t("common.notifications.errors.notDeleted", { type: t("common.words.news") })
		);
	};

	return {
		fetchNewsList,
		fetchNews,
		saveNews,
		deleteNews,
		isLoading,
		error,
		status,
	};
};

export const useNewsList = (newsLimit: number) => {
	const { fetchNewsList } = useNewsActions();

	const {
		data: news,
		isRunning: isLoadingNews,
		execute,
	} = useSafeAxiosRunner(async () => {
		const { result } = await fetchNewsList(newsLimit);

		return result?.data.data ?? [];
	});

	return { news, isLoadingNews, updateNews: execute };
};

export const useNews = (newsId: Ref<string | undefined>) => {
	const { t } = useI18nGlobal();

	const { fetchNews, isLoading } = useNewsActions();

	const newsInstance = ref<NewsResponse>();

	const loadNews = async () => {
		if (!newsId.value) return;
		const { success, result } = await fetchNews(newsId.value);
		if (success) newsInstance.value = result?.data;
	};

	watch(newsId, loadNews, { immediate: true });

	const createdAtFormattedStandard = computed(() => {
		if (!newsInstance.value?.createdAt) return undefined;
		return formatUtc(newsInstance.value.createdAt, "date");
	});

	const createdAtFormattedFromNow = computed(() => {
		if (!newsInstance.value?.createdAt) return undefined;
		return fromNowUtc(newsInstance.value.createdAt);
	});

	const displayAtFormattedStandard = computed(() => {
		if (!newsInstance.value?.displayAt) return undefined;
		return formatUtc(newsInstance.value.displayAt, "date");
	});

	const displayAtFormattedFromNow = computed(() => {
		if (!newsInstance.value?.displayAt) return undefined;
		return fromNowUtc(newsInstance.value.displayAt);
	});

	const lastTouchedFormattedFromNow = computed(() => {
		if (!newsInstance.value?.updatedAt) return undefined;
		return fromNowUtc(newsInstance.value.updatedAt);
	});

	const displayedDateText = computed(() => {
		const wasUpdated = diff(dayjs(newsInstance.value?.createdAt), dayjs(newsInstance.value?.updatedAt), "second") !== 0;
		const isScheduled =
			diff(dayjs(newsInstance.value?.createdAt), dayjs(newsInstance.value?.displayAt), "second") !== 0;

		if (isScheduled) return t("pages.news.details.published", { date: displayAtFormattedFromNow.value });
		if (wasUpdated) return t("pages.news.details.updated", { date: lastTouchedFormattedFromNow.value });
		return t("pages.news.details.created", { date: createdAtFormattedFromNow.value });
	});

	const creator = computed(() => {
		if (!newsInstance.value) return undefined;
		return `${newsInstance.value.creator.firstName} ${newsInstance.value.creator.lastName}`;
	});

	return {
		newsInstance,
		createdAtFormattedStandard,
		createdAtFormattedFromNow,
		displayAtFormattedStandard,
		displayAtFormattedFromNow,
		lastTouchedFormattedFromNow,
		displayedDateText,
		creator,
		loadNews,
		isLoadingNews: isLoading,
	};
};
