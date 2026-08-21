import { useNews, useNewsActions, useNewsList, useNewsOverview } from "./news.composable";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import * as dateTimeUtils from "@/utils/date-time.utils";
import { mockApi, mockApiResponse, newsResponseFactory } from "@@/tests/test-utils";
import * as serverApi from "@api-server";
import * as dataApp from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { ref } from "vue";

describe("news composable", () => {
	let newsApiMock: Mocked<serverApi.NewsApiInterface>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		newsApiMock = mockApi<serverApi.NewsApiInterface>();
		vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(newsApiMock);
		vi.spyOn(dataApp, "notifyError").mockImplementation(vi.fn());
		vi.spyOn(logger, "error").mockImplementation(vi.fn());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("useNewsActions", () => {
		describe("when newsId is missing", () => {
			it("should notify and fail", async () => {
				const { saveNews } = useNewsActions();

				const result = await saveNews(undefined, { title: "title", content: "content" });

				expect(result.success).toBe(false);
				expect(dataApp.notifyError).toHaveBeenCalled();
				expect(newsApiMock.newsControllerUpdate).not.toHaveBeenCalled();
			});
		});

		describe("when newsId is provided", () => {
			it("should call fetchNews API", async () => {
				const { fetchNews } = useNewsActions();

				await fetchNews("news-1");

				expect(newsApiMock.newsControllerFindOne).toHaveBeenCalledWith("news-1");
			});

			it("should call saveNews API", async () => {
				const { saveNews } = useNewsActions();
				const payload = { title: "title", content: "content" };

				await saveNews("news-1", payload);

				expect(newsApiMock.newsControllerUpdate).toHaveBeenCalledWith("news-1", payload);
			});

			it("should call fetchNewsList API with the provided limit", async () => {
				const { fetchNewsList } = useNewsActions();

				await fetchNewsList({ limit: 4 });

				expect(newsApiMock.newsControllerFindAll).toHaveBeenCalledWith(undefined, undefined, undefined, undefined, 4);
			});

			it("should call fetchNewsPage API with pagination and unpublished filter", async () => {
				const { fetchNewsList } = useNewsActions();

				await fetchNewsList({ limit: 10, skip: 5, unpublished: true });

				expect(newsApiMock.newsControllerFindAll).toHaveBeenCalledWith(undefined, undefined, true, 5, 10);
			});

			describe("deleteNews", () => {
				describe("when newsId is missing", () => {
					it("should return failure and notify", async () => {
						const { deleteNews } = useNewsActions();

						const result = await deleteNews(undefined);

						expect(result.success).toBe(false);
						expect(dataApp.notifyError).toHaveBeenCalled();
						expect(newsApiMock.newsControllerDelete).not.toHaveBeenCalled();
					});
				});

				describe("when deletion is not confirmed", () => {
					it("should not call deleteNews API", async () => {
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
				});
				describe("when deletion is confirmed", () => {
					it("deleteNews should call API", async () => {
						vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);
						const { deleteNews } = useNewsActions();

						await deleteNews("news-1");

						expect(newsApiMock.newsControllerDelete).toHaveBeenCalledWith("news-1");
					});
				});
			});
		});
	});

	describe("useNewsList", () => {
		it("should return an empty list immediately before the first fetch resolves", () => {
			newsApiMock.newsControllerFindAll.mockResolvedValueOnce(
				mockApiResponse({ data: { data: [newsResponseFactory.build()], total: 1, skip: 0, limit: 4 } })
			);

			const { news } = useNewsList(4);

			expect(news.value).toEqual([]);
		});

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

		it("should expose empty list when fetch fails", async () => {
			newsApiMock.newsControllerFindAll.mockRejectedValueOnce(new Error("fetch failed"));

			const { news } = useNewsList(4);
			await flushPromises();

			expect(news.value).toEqual([]);
		});
	});

	describe("useNewsOverview", () => {
		it("should keep defaults when initial published fetch fails", async () => {
			newsApiMock.newsControllerFindAll.mockRejectedValueOnce(new Error("fetch failed"));

			const overview = useNewsOverview({ canEditNews: ref(false) });
			await flushPromises();

			expect(overview.newsList.value).toEqual([]);
			expect(overview.total.value).toBe(0);
		});

		it("should keep unpublished total unchanged when total fetch fails", async () => {
			newsApiMock.newsControllerFindAll
				.mockResolvedValueOnce(
					mockApiResponse({ data: { data: [newsResponseFactory.build()], total: 5, skip: 0, limit: 10 } })
				)
				.mockRejectedValueOnce(new Error("fetch unpublished total failed"));

			const overview = useNewsOverview({ canEditNews: ref(true) });
			await flushPromises();

			expect(overview.total.value).toBe(5);
			expect(overview.unpublishedTotal.value).toBe(0);
		});

		describe("when editing is allowed", () => {
			it("should load published news and unpublished total on init", async () => {
				const publishedNews = [newsResponseFactory.build(), newsResponseFactory.build()];
				newsApiMock.newsControllerFindAll
					.mockResolvedValueOnce(mockApiResponse({ data: { data: publishedNews, total: 21, skip: 0, limit: 10 } }))
					.mockResolvedValueOnce(mockApiResponse({ data: { data: [], total: 7, skip: 0, limit: 1 } }));

				const overview = useNewsOverview({ canEditNews: ref(true) });
				await flushPromises();

				expect(newsApiMock.newsControllerFindAll).toHaveBeenNthCalledWith(1, undefined, undefined, false, 0, 10);
				expect(newsApiMock.newsControllerFindAll).toHaveBeenNthCalledWith(2, undefined, undefined, true, 0, 1);
				expect(overview.newsList.value).toEqual(publishedNews);
				expect(overview.total.value).toBe(21);
				expect(overview.unpublishedTotal.value).toBe(7);
				expect(overview.pageCount.value).toBe(3);
				expect(overview.activeTab.value).toBe("published");
				expect(overview.currentPage.value).toBe(1);
			});
		});

		describe("when editing is not allowed", () => {
			it("should not fetch unpublished total", async () => {
				newsApiMock.newsControllerFindAll.mockResolvedValueOnce(
					mockApiResponse({ data: { data: [newsResponseFactory.build()], total: 5, skip: 0, limit: 10 } })
				);

				useNewsOverview({ canEditNews: ref(false) });
				await flushPromises();

				expect(newsApiMock.newsControllerFindAll).toHaveBeenCalledTimes(1);
				expect(newsApiMock.newsControllerFindAll).toHaveBeenCalledWith(undefined, undefined, false, 0, 10);
			});
		});

		it("onPageChange should update current page and load matching page", async () => {
			newsApiMock.newsControllerFindAll
				.mockResolvedValueOnce(
					mockApiResponse({ data: { data: [newsResponseFactory.build()], total: 21, skip: 0, limit: 10 } })
				)
				.mockResolvedValueOnce(mockApiResponse({ data: { data: [], total: 7, skip: 0, limit: 1 } }))
				.mockResolvedValueOnce(
					mockApiResponse({ data: { data: [newsResponseFactory.build()], total: 21, skip: 10, limit: 10 } })
				);

			const overview = useNewsOverview({ canEditNews: ref(true) });
			await flushPromises();

			await overview.onPageChange(2);
			await flushPromises();

			expect(overview.currentPage.value).toBe(2);
			expect(newsApiMock.newsControllerFindAll).toHaveBeenNthCalledWith(3, undefined, undefined, false, 10, 10);
		});

		describe("when switching tabs", () => {
			it("should load news for the selected tab", async () => {
				newsApiMock.newsControllerFindAll
					.mockResolvedValueOnce(
						mockApiResponse({ data: { data: [newsResponseFactory.build()], total: 21, skip: 0, limit: 10 } })
					)
					.mockResolvedValueOnce(mockApiResponse({ data: { data: [], total: 7, skip: 0, limit: 1 } }))
					.mockResolvedValueOnce(
						mockApiResponse({ data: { data: [newsResponseFactory.build()], total: 21, skip: 10, limit: 10 } })
					)
					.mockResolvedValueOnce(
						mockApiResponse({ data: { data: [newsResponseFactory.build()], total: 3, skip: 0, limit: 10 } })
					);

				const overview = useNewsOverview({ canEditNews: ref(true) });
				await flushPromises();

				await overview.onPageChange(2);
				await flushPromises();

				overview.activeTab.value = "unpublished";
				await flushPromises();

				expect(overview.currentPage.value).toBe(1);
				expect(newsApiMock.newsControllerFindAll).toHaveBeenNthCalledWith(4, undefined, undefined, true, 0, 10);
				expect(overview.unpublishedTotal.value).toBe(3);
			});
		});
	});

	describe("useNews", () => {
		it("should expose undefined formatted fields and creator before data is loaded", async () => {
			const newsId = ref<string | undefined>(undefined);
			const { creator, displayAtFormattedFromNow, displayAtFormattedStandard } = useNews(newsId);

			expect(creator.value).toBeUndefined();
			expect(displayAtFormattedStandard.value).toBeUndefined();
			expect(displayAtFormattedFromNow.value).toBeUndefined();
		});

		describe("when newsId is undefined", () => {
			it("should not fetch API", async () => {
				const newsId = ref<string | undefined>(undefined);

				useNews(newsId);
				await flushPromises();

				expect(newsApiMock.newsControllerFindOne).not.toHaveBeenCalled();
			});
		});

		it("should fetch news on init", async () => {
			const newsId = ref("news-1");
			const mockedNews = newsResponseFactory.build();
			newsApiMock.newsControllerFindOne.mockResolvedValueOnce(mockApiResponse({ data: mockedNews }));

			const { newsInstance } = useNews(newsId);
			await flushPromises();

			expect(newsApiMock.newsControllerFindOne).toHaveBeenCalledWith("news-1");
			expect(newsInstance.value).toEqual(mockedNews);
		});

		describe("when newsId changes", () => {
			it("should update fetched news", async () => {
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

		it("should keep formatted dates undefined when displayAt is missing", async () => {
			const newsId = ref("news-1");
			const mockedNews = {
				...newsResponseFactory.build(),
				displayAt: undefined,
			} as unknown as serverApi.NewsResponse;
			newsApiMock.newsControllerFindOne.mockResolvedValueOnce(mockApiResponse({ data: mockedNews }));

			const { displayAtFormattedFromNow, displayAtFormattedStandard } = useNews(newsId);
			await flushPromises();

			expect(displayAtFormattedStandard.value).toBeUndefined();
			expect(displayAtFormattedFromNow.value).toBeUndefined();
			expect(dateTimeUtils.formatUtc).not.toHaveBeenCalled();
			expect(dateTimeUtils.fromNowUtc).not.toHaveBeenCalled();
		});

		describe("when fetch fails", () => {
			it("should keep news undefined", async () => {
				const newsId = ref("news-1");
				newsApiMock.newsControllerFindOne.mockRejectedValueOnce(new Error("fetch failed"));

				const { newsInstance } = useNews(newsId);
				await flushPromises();

				expect(newsInstance.value).toBeUndefined();
			});
		});
	});
});
