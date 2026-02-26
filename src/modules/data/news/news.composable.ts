import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { CreateNewsParams, NewsApiFactory } from "@/serverApi/v3";
import { News, PatchNewsPayload } from "@/store/types/news";
import { $axios } from "@/utils/api";
import { notifySuccess } from "@data-app";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useNews = () => {
	const newsApi = NewsApiFactory(undefined, "/v3", $axios);
	const { t } = useI18n();
	const { execute, status } = useSafeAxiosTask();
	const createdNews = ref<News | null>(null);
	const currentNews = ref<News | null>(null);

	const findOneNews = async (newsId: string) => {
		const { result } = await execute(() => newsApi.newsControllerFindOne(newsId));
		currentNews.value = result?.data ?? null;
	};

	const createNews = async (payload: CreateNewsParams) => {
		const { result, error } = await execute(
			() => newsApi.newsControllerCreate(payload),
			t("components.organisms.FormNews.errors.create")
		);
		if (error || !result) return;

		createdNews.value = result.data;
		notifySuccess(t("components.organisms.FormNews.success.create"));
	};

	const updateNews = async (payload: PatchNewsPayload) => {
		const { result, error } = await execute(
			() => newsApi.newsControllerUpdate(payload.id, payload),
			t("components.organisms.FormNews.error.patch")
		);
		if (error || !result) return;

		currentNews.value = result.data;
		notifySuccess(t("components.organisms.FormNews.success.patch"));
	};

	const deleteNews = async (newsId: string) => {
		const { error } = await execute(
			() => newsApi.newsControllerDelete(newsId),
			t("components.organisms.FormNews.error.remove")
		);
		if (error) return;

		currentNews.value = null;
		notifySuccess(t("components.organisms.FormNews.success.remove"));
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
