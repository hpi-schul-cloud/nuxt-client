import NewsModule from "./news";
import * as serverApi from "../serverApi/v3/api";

describe("news store", () => {
	describe("findNews", () => {
		it("should request a list of news", (done) => {
			const mockApi = {
				newsControllerFindAll: jest.fn(() => ({
					data: {
						data: [{ mockNews: "mock news value" }],
						total: 3,
						skip: 0,
						limit: 10,
					},
				})),
			};
			jest
				.spyOn(serverApi, "NewsApiFactory")
				.mockReturnValue(mockApi as unknown as serverApi.NewsApiInterface);
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
		});
		it("should handle an error", (done) => {
			const error = { status: 418, statusText: "I'm a teapot" };
			const mockApi = {
				newsControllerFindAll: jest.fn(() => Promise.reject({ ...error })),
			};
			jest
				.spyOn(serverApi, "NewsApiFactory")
				.mockReturnValue(mockApi as unknown as serverApi.NewsApiInterface);
			const newsModule = new NewsModule({});

			newsModule.findNews().then(() => {
				expect(newsModule.getNews).toStrictEqual([]);
				expect(newsModule.getStatus).toBe("pending");
				expect(newsModule.businessError).toStrictEqual(error);
				done();
			});
			expect(newsModule.getStatus).toBe("pending");
			expect(mockApi.newsControllerFindAll).toHaveBeenCalledTimes(1);
		});
	});
	describe("fetchNews", () => {
		it("should request a single news", (done) => {
			const mockApi = {
				newsControllerFindOne: jest.fn(() => ({
					data: { mockNews: "mock news value" },
				})),
			};
			jest
				.spyOn(serverApi, "NewsApiFactory")
				.mockReturnValue(mockApi as unknown as serverApi.NewsApiInterface);
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
		});
		it("should handle an error", (done) => {
			const error = { status: 418, statusText: "I'm a teapot" };
			const mockApi = {
				newsControllerFindOne: jest.fn(() => Promise.reject({ ...error })),
			};
			jest
				.spyOn(serverApi, "NewsApiFactory")
				.mockReturnValue(mockApi as unknown as serverApi.NewsApiInterface);
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
		});
	});
	describe("createNews", () => {
		it("should request a single news", (done) => {
			const mockApi = {
				newsControllerCreate: jest.fn((newsToCreate) => ({
					data: { id: 42, ...newsToCreate },
				})),
			};
			jest
				.spyOn(serverApi, "NewsApiFactory")
				.mockReturnValue(mockApi as unknown as serverApi.NewsApiInterface);
			const newsModule = new NewsModule({});

			const newsToCreate = {
				title: "a news title",
				content: "a news content",
				schoolId: "1234",
				targetId: null,
				targetModel: null,
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
			expect(mockApi.newsControllerCreate).toHaveBeenLastCalledWith(
				newsToCreate
			);
		});
		it("should handle an error", (done) => {
			const error = { status: 418, statusText: "I'm a teapot" };
			const mockApi = {
				newsControllerCreate: jest.fn(() => Promise.reject({ ...error })),
			};
			jest
				.spyOn(serverApi, "NewsApiFactory")
				.mockReturnValue(mockApi as unknown as serverApi.NewsApiInterface);
			const newsModule = new NewsModule({});
			const newsToCreate = {
				title: "a news title",
				content: "a news content",
				schoolId: "1234",
				targetId: null,
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
		});
	});
});
