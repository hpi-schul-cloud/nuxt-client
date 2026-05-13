import { useSafeAxiosRunner, useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { askConfirmation } from "@/utils/confirmation-dialog.utils";
import { NewsApiFactory } from "@api-server";
import { Ref } from "vue";

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

	const deleteNews = async (newsId: string) => {
		const isConfirmed = await askConfirmation({
			title: "components.organisms.FormNews.remove.confirm.message",
			confirmBtnKey: "components.organisms.FormNews.remove.confirm.confirm",
		});
		if (isConfirmed) {
			return await execute(
				() => newsApi.newsControllerDelete(newsId),
				t("common.notifications.errors.notDeleted", { type: t("common.words.news") })
			);
		}
	};

	return {
		fetchNewsList,
		fetchNews,
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

};
