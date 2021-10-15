import { NewsApiInterface } from "@/serverApi/v3";
import { NewsModule } from "./news";

// jest.mock("../utils/api", () => {
// 	return {
// 		$axios: {
// 			$get: (path: string) => {
// 				if (path === "/v3/news") {
// 					return {
// 						data: { mockNews: "mock news value" },
// 						limit: 1,
// 						skip: 2,
// 						total: 3,
// 					};
// 				} else {
// 					return { mockNews: "mock news value" };
// 				}
// 			},
// 			$post: (path: string, payload: any) => payload,
// 		},
// 	};
// });

jest.mock("../serverApi/v3/api", () => {
	return {
		NewsApiFactory: () => ({
			newsControllerFindAll: async () => ({
				data: {
					data: [{ mockNews: "mock news value" }],
					total: 3,
					skip: 0,
					limit: 10,
				},
				status: 200,
				statusText: "ok",
				headers: null,
				config: {},
				request: null,
			}),
			newsControllerFindOne: async () => ({
				data: {
					mockNews: "mock news value",
				},
				status: 200,
				statusText: "ok",
				headers: null,
				config: {},
				request: null,
			}),
			newsControllerCreate: async () => ({
				data: {
					title: "a news title",
					content: "a news content",
					schoolId: "1234",
					targetId: null,
					targetModel: null,
				},
				status: 200,
				statusText: "ok",
				headers: null,
				config: {},
				request: null,
			}),
			newsControllerUpdate: async () => ({
				data: {
					mockNews: "mock news value",
				},
				status: 200,
				statusText: "ok",
				headers: null,
				config: {},
				request: null,
			}),
			newsControllerDelete: async () => ({
				data: null,
				status: 200,
				statusText: "ok",
				headers: null,
				config: {},
				request: null,
			}),
		}),
	};
});

describe("news store", () => {
	describe("findNews", () => {
		it("should request a list of news", (done) => {
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
		});
	});
	describe("fetchNews", () => {
		it("should request a single news", (done) => {
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
		});
	});
	describe("createNews", () => {
		it("should request a single news", (done) => {
			const newsModule = new NewsModule({});
			const newsId = "1234";

			const newsToCreate = {
				title: "a news title",
				content: "a news content",
				schoolId: "1234",
				targetId: null,
				targetModel: null,
			};

			newsModule.createNews(newsToCreate).then(() => {
				expect(newsModule.getCreatedNews).toStrictEqual({ ...newsToCreate });
				expect(newsModule.getStatus).toBe("completed");
				done();
			});
			expect(newsModule.getStatus).toBe("pending");
		});
	});
});
