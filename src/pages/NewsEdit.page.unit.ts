import NewsEditPage from "./NewsEdit.page.vue";
import { NewsResponse } from "@/serverApi/v3";
import { Status } from "@/store/types/commons";
import { newsResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useNews } from "@data-news";
import { FormNews } from "@feature-news";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { DefaultWireframe } from "@ui-layout";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { ref } from "vue";
import { Router, useRoute, useRouter } from "vue-router";

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;
const useRouteMock = <Mock>useRoute;

vi.mock("@data-news/news.composable");
const useNewsMock = vi.mocked(useNews);

describe("NewsEditPage", () => {
	let useNewsMockReturn: DeepMocked<ReturnType<typeof useNews>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (options?: Partial<{ currentNews: NewsResponse; status: Status }>) => {
		const news = newsResponseFactory.build();
		const { currentNews, status } = {
			currentNews: news,
			status: "" as Status,
			...options,
		};
		const router = createMock<Router>({});
		useRouterMock.mockReturnValue(router);
		useRouteMock.mockReturnValue({
			params: { id: news.id },
		});

		useNewsMockReturn = createMock<ReturnType<typeof useNews>>();
		useNewsMock.mockReturnValue(useNewsMockReturn);

		useNewsMockReturn.currentNews = ref(currentNews);
		useNewsMockReturn.status = ref(status);

		const wrapper = mount(NewsEditPage, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n(), createTestingPinia()],
				stubs: {
					FormNews: true,
				},
			},
		});

		return { wrapper, news };
	};

	it("should render component", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	it("should render breadcrumbs with news title", () => {
		const { wrapper, news } = setup();
		const defaultWireframe = wrapper.findComponent(DefaultWireframe);

		expect(defaultWireframe.exists()).toBe(true);
		expect(defaultWireframe.props("breadcrumbs")).toEqual([
			{ to: "/news", title: "pages.news.title" },
			{ to: `/news/${news.id}`, title: news.title },
			{ title: "pages.news.edit.title.default", disabled: true },
		]);
	});

	it("should not render form news when news is not loaded", () => {
		const { wrapper } = setup({ currentNews: undefined });
		const formNews = wrapper.findComponent(FormNews);
		expect(formNews.exists()).toBe(false);
	});

	it("should render form news when news is loaded", () => {
		const { wrapper } = setup();
		const formNews = wrapper.findComponent(FormNews);
		expect(formNews.exists()).toBe(true);
	});

	it("should find one news on mount", () => {
		const { news } = setup();
		expect(useNewsMockReturn.findOneNews).toHaveBeenCalledWith(news.id);
	});

	it("should set default page title when news title is not available", async () => {
		setup({ currentNews: undefined });
		await flushPromises();

		expect(document.title).toEqual("pages.news.edit.title.default");
	});

	it("should set page title with news title", async () => {
		setup();
		await flushPromises();

		expect(document.title).toEqual("pages.news.edit.title");
	});

	describe("save news editing", () => {
		it("should update news and navigate to news detail page", async () => {
			const { wrapper, news } = setup();
			const formNews = wrapper.getComponent(FormNews);
			const updatedNews = { ...news, title: "Updated Title" };
			const updateParams = {
				id: news.id,
				title: updatedNews.title,
				content: updatedNews.content,
				displayAt: updatedNews.displayAt,
			};

			formNews.vm.$emit("save", updateParams);
			await flushPromises();

			expect(useNewsMockReturn.updateNews).toHaveBeenCalledWith(updateParams);
		});

		it("should navigate to news detail page when update is successful", async () => {
			const { wrapper, news } = setup({ status: "completed" });
			const formNews = wrapper.getComponent(FormNews);
			const updateParams = {
				id: news.id,
				title: news.title,
				content: news.content,
				displayAt: news.displayAt,
			};

			formNews.vm.$emit("save", updateParams);
			await flushPromises();

			expect(useRouterMock().push).toHaveBeenCalledWith({ path: `/news/${news.id}` });
		});
	});

	describe("delete news", () => {
		it("should delete news", async () => {
			const { wrapper, news } = setup();
			const formNews = wrapper.getComponent(FormNews);

			formNews.vm.$emit("delete");
			await flushPromises();

			expect(useNewsMockReturn.deleteNews).toHaveBeenCalledWith(news.id);
		});

		it("should navigate to news list page after successful deletion", async () => {
			const { wrapper } = setup({ status: "completed" });
			const formNews = wrapper.getComponent(FormNews);

			formNews.vm.$emit("delete");
			await flushPromises();

			expect(useRouterMock().push).toHaveBeenCalledWith({ path: "/news" });
		});
	});

	describe("cancel news editing", () => {
		it("should navigate back to previous page", async () => {
			const { wrapper } = setup();
			const formNews = wrapper.findComponent(FormNews);

			formNews.vm.$emit("cancel");
			await flushPromises();

			expect(useRouterMock().go).toHaveBeenCalled();
		});
	});
});
