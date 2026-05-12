import NewsDetailsPage from "./NewsDetails.page.vue";
import { initializeAxios } from "@/utils/api";
import { mockApi, mockApiResponse, mockAxiosInstance, newsResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { NewsApiInterface, NewsResponse } from "@api-server";
import * as serverApi from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { createRouterMock, getRouter, injectRouterMock } from "vue-router-mock";

describe("NewsDetailsPage", () => {
	let newsApi: Mocked<NewsApiInterface>;
	let axiosMock: Mocked<AxiosInstance>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		newsApi = mockApi<NewsApiInterface>();
		axiosMock = mockAxiosInstance();

		vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(newsApi);
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = async (options?: Partial<{ currentNews: NewsResponse | undefined }>) => {
		const news = newsResponseFactory.build();
		const { currentNews } = {
			currentNews: news,
			...options,
		};

		newsApi.newsControllerFindOne.mockResolvedValue(mockApiResponse<NewsResponse>({ data: currentNews }));

		const router = createRouterMock({
			routes: [
				{ path: "/news", name: "news-list", component: { template: "<div />" } },
				{ path: "/news/:id", name: "news-details", component: { template: "<div />" } },
			],
		});
		injectRouterMock(router);
		await router.push({ name: "news-details", params: { id: news.id } });

		const wrapper = mount(NewsDetailsPage, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n(), createTestingPinia()],
			},
		});
		await flushPromises();

		router.push.mockClear();

		return { wrapper, news };
	};

	it("should render component", async () => {
		const { wrapper } = await setup();
		expect(wrapper.exists()).toBe(true);
	});

	describe("when news data is loaded", () => {
		it("should display the news title", async () => {
			const { wrapper, news } = await setup();
			const title = wrapper.find("[data-testid='news-title']");
			expect(title.exists()).toBe(true);
			expect(title.text()).toContain(news.title);
		});

		it("should display the news content", async () => {
			const { wrapper, news } = await setup();
			const content = wrapper.find("[data-testid='news-content']");
			expect(content.exists()).toBe(true);
			expect(content.text()).toContain(news.content);
		});
	});

	describe("when the edit button is clicked", () => {
		it("should navigate to the edit page", async () => {
			const { wrapper, news } = await setup();
			const editButton = wrapper.find("[data-testid='news-edit-btn']");
			expect(editButton.exists()).toBe(true);
			await editButton.trigger("click");
			expect(getRouter().push).toHaveBeenCalledWith({ path: `/news/${news.id}/edit` });
		});
	});

	describe("when the delete button is clicked", () => {
		it.todo("should call onDelete when delete button is clicked");
	});

	describe("when news is not loaded", () => {
		it("should not render news details when news is undefined", async () => {
			const { wrapper } = await setup({ currentNews: undefined });
			const title = wrapper.find("[data-testid='news-title']");
			expect(title.exists()).toBe(false);
		});
	});
});
