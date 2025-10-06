import * as serverApi from "../serverApi/v3/api";
import NewsModule from "./news";

describe("news store", () => {
	describe("findNews", () => {
		it("should request a list of news", () =>
			new Promise<void>((done) => {
				const mockApi = {
					newsControllerFindAll: vi.fn(() => ({
						data: {
							data: [{ mockNews: "mock news value" }],
							total: 3,
							skip: 0,
							limit: 10,
						},
					})),
				};
				vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(mockApi as unknown as serverApi.NewsApiInterface);
				const newsModule = new NewsModule({});

				newsModule.findNews().then(() => {
					expect(newsModule.getNews).toStrictEqual([
						{
							mockNews: "mock news value",
						},
					]);
					expect(newsModule.getStatus).toBe("completed");
					done();
				});
				expect(newsModule.getStatus).toBe("pending");
				expect(mockApi.newsControllerFindAll).toHaveBeenCalledTimes(1);
			}));
		it("should handle an error", () =>
			new Promise<void>((done) => {
				const error = { status: 418, statusText: "I'm a teapot" };
				const mockApi = {
					newsControllerFindAll: vi.fn(() => Promise.reject({ ...error })),
				};
				vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(mockApi as unknown as serverApi.NewsApiInterface);
				const newsModule = new NewsModule({});

				newsModule.findNews().then(() => {
					expect(newsModule.getNews).toStrictEqual([]);
					expect(newsModule.getStatus).toBe("pending");
					expect(newsModule.businessError).toStrictEqual(error);
					done();
				});
				expect(newsModule.getStatus).toBe("pending");
				expect(mockApi.newsControllerFindAll).toHaveBeenCalledTimes(1);
			}));
	});
	describe("fetchNews", () => {
		it("should request a single news", () =>
			new Promise<void>((done) => {
				const mockApi = {
					newsControllerFindOne: vi.fn(() => ({
						data: { mockNews: "mock news value" },
					})),
				};
				vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(mockApi as unknown as serverApi.NewsApiInterface);
				const newsModule = new NewsModule({});
				const newsId = "1234";

				newsModule.fetchNews(newsId).then(() => {
					expect(newsModule.getCurrentNews).toStrictEqual({
						mockNews: "mock news value",
					});
					expect(newsModule.getStatus).toBe("completed");
					done();
				});
				expect(newsModule.getStatus).toBe("pending");
				expect(mockApi.newsControllerFindOne).toHaveBeenLastCalledWith(newsId);
			}));
		it("should handle an error", () =>
			new Promise<void>((done) => {
				const error = { status: 418, statusText: "I'm a teapot" };
				const mockApi = {
					newsControllerFindOne: vi.fn(() => Promise.reject({ ...error })),
				};
				vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(mockApi as unknown as serverApi.NewsApiInterface);
				const newsModule = new NewsModule({});
				const newsId = "1234";

				newsModule.fetchNews(newsId).then(() => {
					expect(newsModule.getNews).toStrictEqual([]);
					expect(newsModule.getStatus).toBe("pending");
					expect(newsModule.businessError).toStrictEqual(error);
					done();
				});
				expect(newsModule.getStatus).toBe("pending");
				expect(mockApi.newsControllerFindOne).toHaveBeenCalledTimes(1);
			}));
	});
	describe("createNews", () => {
		it("should request a single news", () =>
			new Promise<void>((done) => {
				const mockApi = {
					newsControllerCreate: vi.fn((newsToCreate) => ({
						data: { id: 42, ...newsToCreate },
					})),
				};
				vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(mockApi as unknown as serverApi.NewsApiInterface);
				const newsModule = new NewsModule({});

				const newsToCreate: serverApi.CreateNewsParams = {
					title: "a news title",
					content: "a news content",
					targetId: "4711",
					targetModel: serverApi.CreateNewsParamsTargetModelEnum.Courses,
				};

				newsModule.createNews(newsToCreate).then(() => {
					expect(newsModule.getCreatedNews).toStrictEqual({
						id: 42,
						...newsToCreate,
					});
					expect(newsModule.getStatus).toBe("completed");
					done();
				});
				expect(newsModule.getStatus).toBe("pending");
				expect(mockApi.newsControllerCreate).toHaveBeenLastCalledWith(newsToCreate);
			}));
		it("should handle an error", () =>
			new Promise<void>((done) => {
				const error = { status: 418, statusText: "I'm a teapot" };
				const mockApi = {
					newsControllerCreate: vi.fn(() => Promise.reject({ ...error })),
				};
				vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(mockApi as unknown as serverApi.NewsApiInterface);
				const newsModule = new NewsModule({});
				const newsToCreate: serverApi.CreateNewsParams = {
					title: "a news title",
					content: "a news content",
					schoolId: "1234",
					targetId: "4711",
					// @ts-expect-error intended
					targetModel: null,
				};

				newsModule.createNews(newsToCreate).then(() => {
					expect(newsModule.getNews).toStrictEqual([]);
					expect(newsModule.getStatus).toBe("pending");
					expect(newsModule.businessError).toStrictEqual(error);
					done();
				});
				expect(newsModule.getStatus).toBe("pending");
				expect(mockApi.newsControllerCreate).toHaveBeenCalledTimes(1);
			}));
	});
});
