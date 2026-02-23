import NewsCreatePage from "./NewsCreate.page.vue";
import { CreateNewsParamsTargetModelEnum } from "@/serverApi/v3";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import { useNews } from "@data-news";
import { FormNews } from "@feature-news";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { HttpStatusCode } from "axios";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { ref } from "vue";
import { LocationQuery, Router, useRoute, useRouter } from "vue-router";

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;
const useRouteMock = <Mock>useRoute;

vi.mock("@data-news/news.composable");
const useNewsMock = vi.mocked(useNews);

describe("NewsCreatePage", () => {
	let useNewsMockReturn: DeepMocked<ReturnType<typeof useNews>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	afterEach(() => {
		vi.clearAllMocks();
	});
	const setup = (options?: Partial<{ query: LocationQuery }>) => {
		const router = createMock<Router>({});
		useRouterMock.mockReturnValue(router);
		useRouteMock.mockReturnValue({
			path: "news/new",
			query: options?.query || {},
		});

		useNewsMockReturn = createMock<ReturnType<typeof useNews>>();
		useNewsMock.mockReturnValue(useNewsMockReturn);

		useNewsMockReturn.createdNews = ref(null);
		useNewsMockReturn.status = ref("");

		const wrapper = mount(NewsCreatePage, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n(), createTestingPinia()],
				stubs: {
					FormNews: true,
				},
			},
		});
		const appStore = mockedPiniaStoreTyping(useAppStore);

		return { wrapper, appStore };
	};

	it("should render component", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	it("should handle application error when query params are not valid", async () => {
		const { appStore } = setup({ query: { contextId: "123", context: "invalid" } });
		await flushPromises();

		expect(appStore.handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.BadRequest);
	});

	describe("create news", () => {
		it("should render FormNews component", () => {
			const { wrapper } = setup();
			const formNews = wrapper.findComponent(FormNews);

			expect(formNews.exists()).toBe(true);
		});

		describe("when save event is emitted", () => {
			it("should create news with context and contextId from query params", () => {
				const query = { contextId: "123", context: CreateNewsParamsTargetModelEnum.Teams };
				const { wrapper } = setup({ query });
				const formNews = wrapper.findComponent(FormNews);
				const createParams = {
					title: "Test News",
					content: "This is a test news content.",
					displayAt: new Date().toISOString(),
				};

				formNews.vm.$emit("save", createParams);

				expect(useNewsMockReturn.createNews).toHaveBeenCalledWith({
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
				const formNews = wrapper.findComponent(FormNews);
				const createParams = {
					title: "Test News",
					content: "This is a test news content.",
					displayAt: new Date().toISOString(),
				};

				formNews.vm.$emit("save", createParams);

				expect(useNewsMockReturn.createNews).toHaveBeenCalledWith({
					title: createParams.title,
					content: createParams.content,
					displayAt: createParams.displayAt,
					targetId: query.target,
					targetModel: query.targetmodel,
				});
			});
		});
	});
});
