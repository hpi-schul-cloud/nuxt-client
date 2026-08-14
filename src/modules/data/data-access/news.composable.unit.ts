import { useNews, useNewsActions, useNewsList } from "./news.composable";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import * as dateTimeUtils from "@/utils/date-time.utils";
import { mockApi, mockApiResponse, newsResponseFactory } from "@@/tests/test-utils";
import * as serverApi from "@api-server";
import * as dataApp from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { ref } from "vue";

describe("useNews", () => {
	let newsApiMock: Mocked<serverApi.NewsApiInterface>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		newsApiMock = mockApi<serverApi.NewsApiInterface>();
		vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(newsApiMock);
		vi.spyOn(dataApp, "notifyError").mockImplementation(vi.fn());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("useNewsActions", () => {
		it("fetchNewsList should call API with the provided limit", async () => {
			const { fetchNewsList } = useNewsActions();

			await fetchNewsList(4);

			expect(newsApiMock.newsControllerFindAll).toHaveBeenCalledWith(undefined, undefined, undefined, undefined, 4);
		});

		it("fetchNewsPage should call API with pagination and unpublished filter", async () => {
			const { fetchNewsPage } = useNewsActions();

			await fetchNewsPage({ limit: 10, skip: 5, unpublished: true });

			expect(newsApiMock.newsControllerFindAll).toHaveBeenCalledWith(undefined, undefined, true, 5, 10);
		});

		it("saveNews should notify and fail when newsId is missing", async () => {
			const { saveNews } = useNewsActions();

			const result = await saveNews(undefined, { title: "title", content: "content" });

			expect(result.success).toBe(false);
			expect(dataApp.notifyError).toHaveBeenCalled();
			expect(newsApiMock.newsControllerUpdate).not.toHaveBeenCalled();
		});

		it("saveNews should call update when newsId is provided", async () => {
			const { saveNews } = useNewsActions();
			const payload = { title: "title", content: "content" };

			await saveNews("news-1", payload);

			expect(newsApiMock.newsControllerUpdate).toHaveBeenCalledWith("news-1", payload);
		});

		it("deleteNews should return failure and notify when newsId is missing", async () => {
			const { deleteNews } = useNewsActions();

			const result = await deleteNews(undefined);

			expect(result.success).toBe(false);
			expect(dataApp.notifyError).toHaveBeenCalled();
			expect(newsApiMock.newsControllerDelete).not.toHaveBeenCalled();
		});

		it("deleteNews should stop when deletion is not confirmed", async () => {
			vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(false);
			const { deleteNews } = useNewsActions();

			const result = await deleteNews("news-1");

			expect(confirmDialogUtils.askConfirmation).toHaveBeenCalledWith({
				title: "components.organisms.FormNews.remove.confirm.message",
				confirmBtnKey: "common.actions.delete",
			});
			expect(result.success).toBe(false);
			expect(newsApiMock.newsControllerDelete).not.toHaveBeenCalled();
		});

		it("deleteNews should call API when deletion is confirmed", async () => {
			vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);
			const { deleteNews } = useNewsActions();

			await deleteNews("news-1");

			expect(newsApiMock.newsControllerDelete).toHaveBeenCalledWith("news-1");
		});
	});

	describe("useNewsList", () => {
		it("should fetch and expose the initial news list", async () => {
			const firstNews = [newsResponseFactory.build(), newsResponseFactory.build()];
			newsApiMock.newsControllerFindAll.mockResolvedValueOnce(
				mockApiResponse({ data: { data: firstNews, total: firstNews.length, skip: 0, limit: 4 } })
			);

			const { news } = useNewsList(4);
			await flushPromises();

			expect(news.value).toEqual(firstNews);
		});

		it("updateNews should refresh list data", async () => {
			const firstNews = [newsResponseFactory.build()];
			const secondNews = [newsResponseFactory.build(), newsResponseFactory.build()];
			newsApiMock.newsControllerFindAll
				.mockResolvedValueOnce(mockApiResponse({ data: { data: firstNews, total: 1, skip: 0, limit: 4 } }))
				.mockResolvedValueOnce(mockApiResponse({ data: { data: secondNews, total: 2, skip: 0, limit: 4 } }));

			const { news, updateNews } = useNewsList(4);
			await flushPromises();
			expect(news.value).toEqual(firstNews);

			await updateNews();
			await flushPromises();

			expect(news.value).toEqual(secondNews);
		});
	});

	describe("useNews", () => {
		it("should fetch news on init when newsId is provided", async () => {
			const newsId = ref("news-1");
			const mockedNews = newsResponseFactory.build();
			newsApiMock.newsControllerFindOne.mockResolvedValueOnce(mockApiResponse({ data: mockedNews }));

			const { newsInstance } = useNews(newsId);
			await flushPromises();

			expect(newsApiMock.newsControllerFindOne).toHaveBeenCalledWith("news-1");
			expect(newsInstance.value).toEqual(mockedNews);
		});

		it("should not fetch when newsId is undefined", async () => {
			const newsId = ref<string | undefined>(undefined);

			useNews(newsId);
			await flushPromises();

			expect(newsApiMock.newsControllerFindOne).not.toHaveBeenCalled();
		});

		it("should update fetched news when newsId changes", async () => {
			const newsId = ref("news-1");
			const firstNews = newsResponseFactory.build({ id: "news-1" });
			const secondNews = newsResponseFactory.build({ id: "news-2" });
			newsApiMock.newsControllerFindOne
				.mockResolvedValueOnce(mockApiResponse({ data: firstNews }))
				.mockResolvedValueOnce(mockApiResponse({ data: secondNews }));

			const { newsInstance } = useNews(newsId);
			await flushPromises();
			expect(newsInstance.value).toEqual(firstNews);

			newsId.value = "news-2";
			await flushPromises();

			expect(newsInstance.value).toEqual(secondNews);
		});

		it("should compute creator and formatted dates from the loaded news", async () => {
			const newsId = ref("news-1");
			const displayAt = "2026-01-01T10:00:00.000Z";
			const mockedNews = {
				...newsResponseFactory.build({ displayAt }),
				creator: { id: "creator-1", firstName: "Ada", lastName: "Lovelace" },
			} as serverApi.NewsResponse;
			vi.spyOn(dateTimeUtils, "formatUtc").mockReturnValue("01.01.2026");
			vi.spyOn(dateTimeUtils, "fromNowUtc").mockReturnValue("in 2 days");
			newsApiMock.newsControllerFindOne.mockResolvedValueOnce(mockApiResponse({ data: mockedNews }));

			const { creator, displayAtFormattedFromNow, displayAtFormattedStandard } = useNews(newsId);
			await flushPromises();

			expect(creator.value).toBe("Ada Lovelace");
			expect(displayAtFormattedStandard.value).toBe("01.01.2026");
			expect(displayAtFormattedFromNow.value).toBe("in 2 days");
			expect(dateTimeUtils.formatUtc).toHaveBeenCalledWith(displayAt, "date");
			expect(dateTimeUtils.fromNowUtc).toHaveBeenCalledWith(displayAt);
		});

		it("should keep news undefined when fetch fails", async () => {
			const newsId = ref("news-1");
			newsApiMock.newsControllerFindOne.mockRejectedValueOnce({});

			const { newsInstance } = useNews(newsId);
			await flushPromises();

			expect(newsInstance.value).toBeUndefined();
		});
	});
});
