import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { CreateNewsParams, NewsApiFactory } from "@/serverApi/v3";
import { Pagination } from "@/store/types/commons";
import { News, PatchNewsPayload } from "@/store/types/news";
import { $axios } from "@/utils/api";
import { ref } from "vue";

export const useNews = () => {
	const newsApi = NewsApiFactory(undefined, "/v3", $axios);
	const { execute, status } = useSafeAxiosTask();
	const news = ref<News[]>([]);
	const createdNews = ref<News>({
		id: "",
		content: "",
		createdAt: "",
		creator: { id: "" },
		displayAt: "",
		school: { id: "" },
		title: "",
		updater: { id: "" },
		targetId: "",
		targetModel: "",
	});
	const current = ref<News | null>(null);
	const pagination = ref<Pagination>({
		limit: 0,
		skip: 0,
		total: 0,
	});

	const findNews = async () => {
		const { result } = await execute(() =>
			newsApi.newsControllerFindAll(undefined, undefined, false, pagination.value.skip, pagination.value.limit)
		);
		const { data: newsResponse, ...paginationData } = result?.data ?? {};
		news.value = newsResponse ?? [];
		pagination.value = {
			limit: 0,
			skip: 0,
			total: 0,
			...paginationData,
		};
	};

	const fetchNews = async (newsId: string) => {
		const { result } = await execute(() => newsApi.newsControllerFindOne(newsId));
		current.value = result?.data ?? null;
	};

	const createNews = async (payload: CreateNewsParams) => {
		const { result, error } = await execute(() => newsApi.newsControllerCreate(payload));
		if (error) return;
		createdNews.value = result?.data ?? null;
	};

	const patchNews = async (payload: PatchNewsPayload) => {
		const { result, error } = await execute(() => newsApi.newsControllerUpdate(payload.id, payload));
		if (error) return;
		current.value = result?.data ?? null;
	};

	const removeNews = async (newsId: string) => {
		const { error } = await execute(() => newsApi.newsControllerDelete(newsId));
		if (error) return;
		current.value = null;
	};

	return {
		news,
		createdNews,
		current,
		pagination,
		status,
		findNews,
		fetchNews,
		createNews,
		patchNews,
		removeNews,
	};
};
