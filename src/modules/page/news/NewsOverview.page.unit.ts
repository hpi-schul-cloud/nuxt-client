import NewsOverviewPage from "./NewsOverview.page.vue";
import { initializeAxios } from "@/utils/api";
import {
	createTestAppStore,
	mockApi,
	mockApiResponse,
	mockAxiosInstance,
	newsResponseFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import * as serverApi from "@api-server";
import { NewsApiInterface, Permission } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

const firstPageNews = newsResponseFactory.buildList(3);
const secondPageNews = newsResponseFactory.buildList(1);
const unpublishedNews = newsResponseFactory.buildList(2);

const getExpectedNewsData = (unpublished?: boolean, skip?: number) => {
	if (unpublished) {
		return unpublishedNews;
	}
	if (skip === 10) {
		return secondPageNews;
	}
	return firstPageNews;
};

describe("NewsOverviewPage", () => {
	let newsApi: Mocked<NewsApiInterface>;
	let axiosMock: Mocked<AxiosInstance>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
		newsApi = mockApi<NewsApiInterface>();
		vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(newsApi);

		newsApi.newsControllerFindAll.mockImplementation(async (_targetModel, _targetId, unpublished, skip, limit) => {
			const data = getExpectedNewsData(unpublished, skip);
			return mockApiResponse({
				data: { data, total: unpublished ? 2 : 11, skip: skip ?? 0, limit: limit ?? 10 },
			});
		});
	});

	const setup = async (options?: { permissions?: Permission[] }) => {
		createTestAppStore({
			me: { permissions: options?.permissions ?? [] },
		});

		const router = createRouterMock({
			routes: [{ path: "/news", name: "news-list", component: { template: "<div />" } }],
		});
		injectRouterMock(router);
		await router.push("/news");

		const wrapper = mount(NewsOverviewPage, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});
		await flushPromises();

		return { wrapper };
	};

	it("renders a card for each returned published news item", async () => {
		const { wrapper } = await setup();

		expect(wrapper.findAll("[data-testid='news-card-item']")).toHaveLength(firstPageNews.length);
	});

	it("renders news cards as links like the dashboard preview", async () => {
		const { wrapper } = await setup();

		expect(wrapper.find("[data-testid='news-card-item']").attributes("href")).toBe(`/news/${firstPageNews[0].id}`);
	});

	it("provides the create action as a sticky wireframe action", async () => {
		const { wrapper } = await setup({ permissions: [Permission.NEWS_CREATE] });

		expect(wrapper.findComponent({ name: "DefaultWireframe" }).props("fabItems")).toEqual([
			{
				icon: expect.any(String),
				label: "pages.news.index.new",
				to: "/news/new",
				dataTestId: "create-news-btn",
			},
		]);
	});

	it("requests ten news items for the first page", async () => {
		await setup();

		expect(newsApi.newsControllerFindAll).toHaveBeenCalledWith(undefined, undefined, false, 0, 10);
	});

	it("loads and renders the next page with the correct offset", async () => {
		const { wrapper } = await setup();

		wrapper.findComponent({ name: "VPagination" }).vm.$emit("update:modelValue", 2);
		await flushPromises();

		expect(newsApi.newsControllerFindAll).toHaveBeenCalledWith(undefined, undefined, false, 10, 10);
		expect(wrapper.findAll("[data-testid='news-card-item']")).toHaveLength(secondPageNews.length);
		expect(wrapper.find("[data-testid='news-title']").text()).toBe(secondPageNews[0].title);
	});

	it("does not render pagination when there are at most ten news", async () => {
		newsApi.newsControllerFindAll.mockResolvedValue(
			mockApiResponse({ data: { data: firstPageNews, total: 10, skip: 0, limit: 10 } })
		);

		const { wrapper } = await setup();

		expect(wrapper.find("[data-testid='news-pagination']").exists()).toBe(false);
	});

	it("loads unpublished news for users with edit permission", async () => {
		const { wrapper } = await setup({ permissions: [Permission.NEWS_EDIT] });

		expect(wrapper.find("[data-testid='unpublished-news-count']").text()).toBe("(2)");

		await wrapper.find("[data-testid='unpublished-news-tab']").trigger("click");
		await flushPromises();

		expect(newsApi.newsControllerFindAll).toHaveBeenCalledWith(undefined, undefined, true, 0, 10);
	});
});