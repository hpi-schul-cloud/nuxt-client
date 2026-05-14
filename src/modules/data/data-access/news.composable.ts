import { useSafeAxiosRunner, useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { askConfirmation } from "@/utils/confirmation-dialog.utils";
import { formatUtc, fromNowUtc } from "@/utils/date-time.utils";
import { NewsApiFactory, NewsResponse, type UpdateNewsParams } from "@api-server";
import { notifyError } from "@data-app";
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
		if (isConfirmed) {
			return await execute(
				() => newsApi.newsControllerDelete(newsId),
				t("common.notifications.errors.notDeleted", { type: t("common.words.news") })
			);
		} else {
			return { success: false };
		}
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
	const { fetchNews, isLoading } = useNewsActions();

	const newsInstance = ref<NewsResponse>();

	const loadNews = async () => {
		if (!newsId.value) return;
		const { success, result } = await fetchNews(newsId.value);
		if (success) newsInstance.value = result?.data;
	};

	watch(newsId, loadNews, { immediate: true });

	const createdAtFormatted = computed(() => {
		if (!newsInstance.value?.createdAt) return "";
		return formatUtc(newsInstance.value.createdAt, "date");
	});

	const displayAtFormatted = computed(() => {
		if (!newsInstance.value?.displayAt) return "";
		return formatUtc(newsInstance.value.displayAt, "date");
	});

	const lastTouched = computed(() => {
		if (!newsInstance.value?.updatedAt) return "";
		return fromNowUtc(newsInstance.value.updatedAt);
	});

	const creator = computed(() => {
		if (!newsInstance.value) return "";
		return `${newsInstance.value.creator.firstName} ${newsInstance.value.creator.lastName}`;
	});

	return {
		newsInstance,
		createdAtFormatted,
		displayAtFormatted,
		lastTouched,
		creator,
		loadNews,
		isLoadingNews: isLoading,
	};
};
