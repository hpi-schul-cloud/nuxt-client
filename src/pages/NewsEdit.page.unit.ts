import NewsEditPage from "./NewsEdit.page.vue";
import { NewsApiInterface, NewsResponse } from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3";
import { initializeAxios } from "@/utils/api";
import { expectNotification, newsResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { NewsForm } from "@feature-news";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { DefaultWireframe } from "@ui-layout";
import { flushPromises } from "@vue/test-utils";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { Router, useRoute, useRouter } from "vue-router";

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;
const useRouteMock = <Mock>useRoute;

describe("NewsEditPage", () => {
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

	const setup = async (options?: Partial<{ currentNews: NewsResponse | undefined }>) => {
		const news = newsResponseFactory.build();
		const { currentNews } = {
			currentNews: news,
			...options,
		};

		newsApi.newsControllerFindOne.mockResolvedValue({ data: currentNews });

		const router = createMock<Router>({});
		useRouterMock.mockReturnValue(router);
		useRouteMock.mockReturnValue({
			params: { id: news.id },
		});

		const wrapper = mount(NewsEditPage, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n(), createTestingPinia()],
				stubs: {
					NewsForm: true,
				},
			},
		});
		await flushPromises();

		return { wrapper, news };
	};

	it("should render component", async () => {
		const { wrapper } = await setup();
		expect(wrapper.exists()).toBe(true);
	});

	it("should render breadcrumbs with news title", async () => {
		const { wrapper, news } = await setup();
		const defaultWireframe = wrapper.findComponent(DefaultWireframe);

		expect(defaultWireframe.exists()).toBe(true);
		expect(defaultWireframe.props("breadcrumbs")).toEqual([
			{ to: "/news", title: "pages.news.title" },
			{ to: `/news/${news.id}`, title: news.title },
			{ title: "pages.news.edit.title.default", disabled: true },
		]);
	});

	it("should not render form news when news is not loaded", async () => {
		const { wrapper } = await setup({ currentNews: undefined });

		const newsForm = wrapper.findComponent(NewsForm);
		expect(newsForm.exists()).toBe(false);
	});

	it("should render form news when news is loaded", async () => {
		const { wrapper } = await setup();

		const newsForm = wrapper.findComponent(NewsForm);
		expect(newsForm.exists()).toBe(true);
	});

	it("should find one news on mount", async () => {
		const { news } = await setup();

		expect(newsApi.newsControllerFindOne).toHaveBeenCalledWith(news.id);
	});

	it("should set default page title when news title is not available", async () => {
		await setup({ currentNews: undefined });

		expect(document.title).toEqual("pages.news.edit.title.default");
	});

	it("should set page title with news title", async () => {
		await setup();

		expect(document.title).toEqual("pages.news.edit.title");
	});

	describe("save news editing", () => {
		it("should call update news", async () => {
			const { wrapper, news } = await setup();

			const newsForm = wrapper.getComponent(NewsForm);
			const updatedNews = { ...news, title: "Updated Title" };
			const updateParams = {
				title: updatedNews.title,
				content: updatedNews.content,
				displayAt: updatedNews.displayAt,
			};

			newsForm.vm.$emit("save", updateParams);
			await flushPromises();

			expect(newsApi.newsControllerUpdate).toHaveBeenCalledWith(news.id, updateParams);
		});

		it("should notify success and navigate to news detail page when update is successful", async () => {
			const { wrapper, news } = await setup();
			const newsForm = wrapper.getComponent(NewsForm);
			const updateParams = {
				id: news.id,
				title: news.title,
				content: news.content,
				displayAt: news.displayAt,
			};

			newsApi.newsControllerUpdate.mockResolvedValue({ data: updateParams });

			newsForm.vm.$emit("save", updateParams);
			await flushPromises();

			expectNotification("success");
			expect(useRouterMock().push).toHaveBeenCalledWith({ path: `/news/${news.id}` });
		});

		it("should not navigate to news detail page when update fails and notify error", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			const { wrapper } = await setup();
			const newsForm = wrapper.getComponent(NewsForm);

			newsApi.newsControllerUpdate.mockRejectedValue(new Error("Failed to update news"));

			newsForm.vm.$emit("save", {
				title: "Updated Title",
				content: "Updated Content",
				displayAt: new Date().toISOString(),
			});
			await flushPromises();

			expect(useRouterMock().push).not.toHaveBeenCalled();
			expectNotification("error");

			consoleErrorSpy.mockRestore();
		});
	});

	describe("delete news", () => {
		it("should delete news", async () => {
			const { wrapper, news } = await setup();
			const newsForm = wrapper.getComponent(NewsForm);

			newsForm.vm.$emit("delete");
			await flushPromises();

			expect(newsApi.newsControllerDelete).toHaveBeenCalledWith(news.id);
		});

		it("should notify success and navigate to news list page after successful deletion", async () => {
			const { wrapper } = await setup();
			const newsForm = wrapper.getComponent(NewsForm);

			newsForm.vm.$emit("delete");
			await flushPromises();

			expect(useRouterMock().push).toHaveBeenCalledWith({ path: "/news" });
			expectNotification("success");
		});

		it("should not navigate to news list page when deletion fails and notify error", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			const { wrapper } = await setup();
			const newsForm = wrapper.getComponent(NewsForm);

			newsApi.newsControllerDelete.mockRejectedValue(new Error("Failed to delete news"));

			newsForm.vm.$emit("delete");
			await flushPromises();

			expect(useRouterMock().push).not.toHaveBeenCalled();
			expectNotification("error");
			consoleErrorSpy.mockRestore();
		});
	});

	describe("cancel news editing", () => {
		it("should navigate back to previous page", async () => {
			const { wrapper } = await setup();
			const newsForm = wrapper.findComponent(NewsForm);

			newsForm.vm.$emit("cancel");
			await flushPromises();

			expect(useRouterMock().go).toHaveBeenCalled();
		});
	});
});
