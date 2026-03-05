import NewsCreatePage from "./NewsCreate.page.vue";
import { CreateNewsParamsTargetModelEnum, NewsApiInterface } from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3";
import { initializeAxios } from "@/utils/api";
import {
	createTestAppStoreWithSchool,
	expectNotification,
	mockApiResponse,
	mockAxiosInstance,
	newsResponseFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { NewsForm } from "@feature-news";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { AxiosInstance, HttpStatusCode } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { LocationQuery } from "vue-router";
import { createRouterMock, getRouter, injectRouterMock } from "vue-router-mock";

describe("NewsCreatePage", () => {
	let newsApi: DeepMocked<NewsApiInterface>;
	let axiosMock: Mocked<AxiosInstance>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));

		newsApi = createMock<NewsApiInterface>();
		axiosMock = mockAxiosInstance();
		vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(newsApi);
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (options?: Partial<{ query: LocationQuery }>) => {
		const router = createRouterMock();
		injectRouterMock(router);
		router.replace({ path: "news/new", query: options?.query || {} });
		vi.spyOn(router, "go");

		const wrapper = mount(NewsCreatePage, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n(), createTestingPinia()],
				stubs: {
					NewsForm: true,
				},
			},
		});
		const schoolId = "schoolId";
		const { appStore } = createTestAppStoreWithSchool(schoolId);

		return { wrapper, appStore, schoolId };
	};

	it("should render component", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	it.each([
		{
			condition: "context query param is not valid",
			query: { contextId: "123", context: "invalid" },
		},
		{
			condition: "targetmodel query param is not valid",
			query: { target: "123", targetmodel: "invalid" },
		},
		{
			condition: "context is valid but contextId is missing",
			query: { context: CreateNewsParamsTargetModelEnum.Teams },
		},
		{
			condition: "targetmodel is valid but target is missing",
			query: { targetmodel: CreateNewsParamsTargetModelEnum.Courses },
		},
	] as { condition: string; query: LocationQuery }[])(
		"should handle application error when $condition",
		async ({ query }) => {
			const { appStore } = setup({ query });
			await flushPromises();

			expect(appStore.handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.BadRequest);
		}
	);

	describe("create news", () => {
		it("should render NewsForm component", () => {
			const { wrapper } = setup();
			const newsForm = wrapper.findComponent(NewsForm);

			expect(newsForm.exists()).toBe(true);
		});

		describe("when save event is emitted", () => {
			const createParams = {
				title: "Test News",
				content: "This is a test news content.",
				displayAt: new Date().toISOString(),
			};

			const createdNewsResponse = newsResponseFactory.build();

			beforeEach(() => {
				newsApi.newsControllerCreate.mockResolvedValue(
					mockApiResponse<serverApi.NewsResponse>({ data: createdNewsResponse })
				);
			});

			it("should create news with context and contextId from query params", () => {
				const query = { contextId: "123", context: CreateNewsParamsTargetModelEnum.Teams };
				const { wrapper } = setup({ query });

				const newsForm = wrapper.getComponent(NewsForm);

				newsForm.vm.$emit("save", createParams);

				expect(newsApi.newsControllerCreate).toHaveBeenCalledWith({
					title: createParams.title,
					content: createParams.content,
					displayAt: createParams.displayAt,
					targetId: query.contextId,
					targetModel: query.context,
				});
			});

			it("should create news with target and targetmodel from query params", () => {
				const query = { target: "456", targetmodel: CreateNewsParamsTargetModelEnum.Courses };
				const { wrapper } = setup({ query });
				const newsForm = wrapper.getComponent(NewsForm);

				newsForm.vm.$emit("save", createParams);

				expect(newsApi.newsControllerCreate).toHaveBeenCalledWith({
					title: createParams.title,
					content: createParams.content,
					displayAt: createParams.displayAt,
					targetId: query.target,
					targetModel: query.targetmodel,
				});
			});

			it("should create news for school when no query params provided", () => {
				const { wrapper, schoolId } = setup();
				const newsForm = wrapper.getComponent(NewsForm);

				newsForm.vm.$emit("save", createParams);

				expect(newsApi.newsControllerCreate).toHaveBeenCalledWith({
					title: createParams.title,
					content: createParams.content,
					displayAt: createParams.displayAt,
					targetId: schoolId,
					targetModel: CreateNewsParamsTargetModelEnum.Schools,
				});
			});

			it("should notify success and navigate to news details page after successful creation", async () => {
				const { wrapper } = setup();
				const newsForm = wrapper.getComponent(NewsForm);

				newsForm.vm.$emit("save", createParams);
				await flushPromises();

				expectNotification("success");
				expect(getRouter().push).toHaveBeenCalledWith({ path: `/news/${createdNewsResponse.id}` });
			});

			it("should not navigate to news details page if update was not successfull", async () => {
				const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
				newsApi.newsControllerCreate.mockRejectedValue(new Error("Failed to create news"));

				const { wrapper } = setup();
				const newsForm = wrapper.getComponent(NewsForm);

				newsForm.vm.$emit("save", createParams);
				await flushPromises();

				expect(getRouter().push).not.toHaveBeenCalled();
				expectNotification("error");

				consoleErrorSpy.mockRestore();
			});
		});
	});

	describe("cancel news creation", () => {
		it("should navigate back to previous page", async () => {
			const { wrapper } = setup();
			const newsForm = wrapper.getComponent(NewsForm);

			newsForm.vm.$emit("cancel");
			await flushPromises();

			expect(getRouter().go).toHaveBeenCalled();
		});
	});
});
