import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { CreateNewsParams, NewsApiFactory } from "@/serverApi/v3";
import { News, PatchNewsPayload } from "@/store/types/news";
import { $axios } from "@/utils/api";
import { ref } from "vue";

export const useNews = () => {
	const newsApi = NewsApiFactory(undefined, "/v3", $axios);
	const { execute, status } = useSafeAxiosTask();
	const createdNews = ref<News | null>(null);
	const currentNews = ref<News | null>(null);

	const findOneNews = async (newsId: string) => {
		const { result } = await execute(() => newsApi.newsControllerFindOne(newsId));
		currentNews.value = result?.data ?? null;
	};

	const createNews = async (payload: CreateNewsParams) => {
		const { result, error } = await execute(() => newsApi.newsControllerCreate(payload));
		if (error) return;
		createdNews.value = result?.data ?? null;
	};

	const updateNews = async (payload: PatchNewsPayload) => {
		const { result, error } = await execute(() => newsApi.newsControllerUpdate(payload.id, payload));
		if (error) return;
		currentNews.value = result?.data ?? null;
	};

	const deleteNews = async (newsId: string) => {
		const { error } = await execute(() => newsApi.newsControllerDelete(newsId));
		if (error) return;
		currentNews.value = null;
	};

	return {
		createdNews,
		currentNews,
		status,
		findOneNews,
		createNews,
		updateNews,
		deleteNews,
	};
};
