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

	const { execute, status, error, loadingState } = useSafeAxiosTask();

	const fetchNewsList = async ({ limit, skip, unpublished }: { limit: number; skip?: number; unpublished?: boolean }) =>
		await execute(
			() => newsApi.newsControllerFindAll(undefined, undefined, unpublished, skip, limit),
			t("common.notifications.errors.notLoaded", { count: 2, type: t("common.words.news", 2) })
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
			confirmBtnKey: "common.actions.delete",
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
		loadingState,
		error,
		status,
	};
};

export const useNewsList = (limit: number) => {
	const { fetchNewsList } = useNewsActions();

	const {
		data: newsData,
		loadingState: newsLoadingState,
		execute,
	} = useSafeAxiosRunner(async () => {
		const { result } = await fetchNewsList({ limit });

		return result?.data.data ?? [];
	});

	const news = computed(() => newsData.value ?? []);

	return { news, newsLoadingState, updateNews: execute };
};

export const useNews = (newsId: Ref<string | undefined>) => {
	const { fetchNews, loadingState } = useNewsActions();

	const newsInstance = ref<NewsResponse>();

	const loadNews = async () => {
		if (!newsId.value) return;
		const { success, result } = await fetchNews(newsId.value);
		if (success) newsInstance.value = result?.data;
	};

	watch(newsId, loadNews, { immediate: true });

	const displayAtFormattedStandard = computed(() => {
		if (!newsInstance.value?.displayAt) return undefined;
		return formatUtc(newsInstance.value.displayAt, "date");
	});

	const displayAtFormattedFromNow = computed(() => {
		if (!newsInstance.value?.displayAt) return undefined;
		return fromNowUtc(newsInstance.value.displayAt);
	});

	const creator = computed(() => {
		if (!newsInstance.value) return undefined;
		return `${newsInstance.value.creator?.firstName} ${newsInstance.value.creator.lastName}`;
	});

	return {
		newsInstance,
		displayAtFormattedStandard,
		displayAtFormattedFromNow,

		creator,
		loadNews,
		newsLoadingState: loadingState,
	};
};

export const useNewsOverview = (params: { canEditNews: Ref<boolean> }) => {
	type NewsOverviewTab = "published" | "unpublished";

	const { canEditNews } = params;
	const NEWS_PER_PAGE = 10;

	const { fetchNewsList, loadingState } = useNewsActions();
	const { fetchNewsList: fetchUnpublishedTotalPage } = useNewsActions();

	const newsList = ref<NewsResponse[]>([]);
	const total = ref(0);
	const unpublishedTotal = ref(0);
	const activeTab = ref<NewsOverviewTab>("published");
	const currentPage = ref(1);

	const pageCount = computed(() => Math.ceil(total.value / NEWS_PER_PAGE));

	const loadNews = async () => {
		const unpublished = activeTab.value === "unpublished";
		const { success, result } = await fetchNewsList({
			limit: NEWS_PER_PAGE,
			skip: (currentPage.value - 1) * NEWS_PER_PAGE,
			unpublished,
		});

		if (!success || !result) return;

		newsList.value = result.data.data;
		total.value = result.data.total;

		if (unpublished) unpublishedTotal.value = result.data.total;
	};

	const loadUnpublishedTotal = async () => {
		if (!canEditNews.value) return;

		const { success, result } = await fetchUnpublishedTotalPage({ limit: 1, skip: 0, unpublished: true });
		if (!success || !result) return;

		unpublishedTotal.value = result.data.total;
	};

	const onPageChange = async (page: number) => {
		currentPage.value = page;
		await loadNews();
	};

	watch(activeTab, async () => {
		currentPage.value = 1;
		await loadNews();
	});

	loadNews();
	loadUnpublishedTotal();

	return {
		newsList,
		total,
		unpublishedTotal,
		activeTab,
		currentPage,
		pageCount,
		loadingState,
		onPageChange,
	};
};
