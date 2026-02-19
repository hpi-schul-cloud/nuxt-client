import { useNews } from "./news.composable";
import * as serverApi from "@/serverApi/v3";
import { CreateNewsParams, CreateNewsParamsTargetModelEnum, NewsApiInterface } from "@/serverApi/v3";
import { initializeAxios } from "@/utils/api";
import { newsResponseFactory } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";

describe("news composable", () => {
	let newsApi: DeepMocked<NewsApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		newsApi = createMock<NewsApiInterface>();
		axiosMock = createMock<AxiosInstance>();

		vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(newsApi);
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("findOneNews", () => {
		it("should fetch a single news", async () => {
			const singleNews = newsResponseFactory.build();
			newsApi.newsControllerFindOne.mockResolvedValue({ data: singleNews });

			const { findOneNews, currentNews } = useNews();
			await findOneNews(singleNews.id);

			expect(newsApi.newsControllerFindOne).toHaveBeenCalledWith(singleNews.id);
			expect(currentNews.value).toEqual(singleNews);
		});

		it("shoudl return null if the news cannot be find", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			newsApi.newsControllerFindOne.mockRejectedValue(new Error("News not found"));

			const { findOneNews, currentNews } = useNews();
			await findOneNews("nonExistingId");

			expect(newsApi.newsControllerFindOne).toHaveBeenCalledWith("nonExistingId");
			expect(currentNews.value).toBeNull();

			consoleErrorSpy.mockRestore();
		});
	});

	describe("createNews", () => {
		const createdNewsResponse = newsResponseFactory.build();
		const createNewsPayload: CreateNewsParams = {
			title: createdNewsResponse.title,
			content: createdNewsResponse.content,
			targetId: createdNewsResponse.targetId,
			targetModel: CreateNewsParamsTargetModelEnum.Schools,
		};

		it("should create a news", async () => {
			newsApi.newsControllerCreate.mockResolvedValue({ data: createdNewsResponse });

			const { createNews, createdNews } = useNews();
			await createNews(createNewsPayload);

			expect(newsApi.newsControllerCreate).toHaveBeenCalledWith(createNewsPayload);
			expect(createdNews.value).toEqual(createdNewsResponse);
		});

		it("should not set createdNews if API call fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			newsApi.newsControllerCreate.mockRejectedValue(new Error("Failed to create news"));

			const { createNews, createdNews } = useNews();
			await createNews(createNewsPayload);

			expect(createdNews.value).toBeNull();

			consoleErrorSpy.mockRestore();
		});

		it("should set createdNews to null if API returns no data", async () => {
			newsApi.newsControllerCreate.mockResolvedValue({ data: null });

			const { createNews, createdNews } = useNews();
			await createNews(createNewsPayload);

			expect(createdNews.value).toBeNull();
		});
	});

	describe("updateNews", () => {
		it("should update current news", async () => {
			const existingNews = newsResponseFactory.build();
			const updatedNews = { ...existingNews, title: "Updated Title" };
			newsApi.newsControllerUpdate.mockResolvedValue({ data: updatedNews });

			const { updateNews, currentNews } = useNews();
			await updateNews({ id: existingNews.id, title: "Updated Title" });
			expect(newsApi.newsControllerUpdate).toHaveBeenCalledWith(existingNews.id, {
				id: existingNews.id,
				title: "Updated Title",
			});
			expect(currentNews.value).toEqual(updatedNews);
		});

		it("should not update current news if API call fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			newsApi.newsControllerUpdate.mockRejectedValue(new Error("Failed to update news"));

			const { updateNews, currentNews } = useNews();
			await updateNews({ id: "newsId", title: "New Title" });

			expect(currentNews.value).toBeNull();

			consoleErrorSpy.mockRestore();
		});

		it("should not update current news if API returns no data", async () => {
			newsApi.newsControllerUpdate.mockResolvedValue({ data: null });

			const { updateNews, currentNews } = useNews();
			await updateNews({ id: "newsId", title: "New Title" });

			expect(currentNews.value).toBeNull();
		});
	});

	describe("deleteNews", () => {
		it("should delete current news", async () => {
			newsApi.newsControllerDelete.mockResolvedValue({});

			const { deleteNews, currentNews } = useNews();
			const newsToDelete = newsResponseFactory.build();
			currentNews.value = newsToDelete;
			await deleteNews(newsToDelete.id);

			expect(newsApi.newsControllerDelete).toHaveBeenCalledWith(newsToDelete.id);
			expect(currentNews.value).toBeNull();
		});

		it("should not delete current news if API call fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			newsApi.newsControllerDelete.mockRejectedValue(new Error("Failed to delete news"));

			const { deleteNews, currentNews } = useNews();
			const newsToDelete = newsResponseFactory.build();
			currentNews.value = newsToDelete;
			await deleteNews(newsToDelete.id);

			expect(currentNews.value).toEqual(newsToDelete);

			consoleErrorSpy.mockRestore();
		});
	});
});
