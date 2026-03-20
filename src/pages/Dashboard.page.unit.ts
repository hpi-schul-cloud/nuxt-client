import DashboardPage from "./Dashboard.page.vue";
import { initializeAxios } from "@/utils/api";
import {
	createTestAppStore,
	mockApi,
	mockApiResponse,
	mockAxiosInstance,
	newsResponseFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { NewsApiInterface, NewsResponse, RoleName, ServerReleaseApiInterface } from "@api-server";
import * as serverApi from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

describe("DashboardPage", () => {
	let newsApi: Mocked<NewsApiInterface>;
	let releasesApi: Mocked<ServerReleaseApiInterface>;
	let axiosMock: Mocked<AxiosInstance>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));

		newsApi = mockApi<NewsApiInterface>();
		releasesApi = mockApi<ServerReleaseApiInterface>();
		axiosMock = mockAxiosInstance();

		vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(newsApi);
		vi.spyOn(serverApi, "ServerReleaseApiFactory").mockReturnValue(releasesApi);
		initializeAxios(axiosMock);
	});

	const setup = (options?: { roleName?: RoleName; news?: NewsResponse[] }) => {
		createTestAppStore({
			me: { roles: options?.roleName ? [{ id: options.roleName, name: options.roleName }] : [] },
		});

		newsApi.newsControllerFindAll.mockResolvedValue(
			mockApiResponse({ data: { data: options?.news ?? [], total: 0, skip: 0, limit: 4 } })
		);
		releasesApi.serverReleaseControllerGetReleases.mockResolvedValue(
			mockApiResponse({ data: { data: [], total: 0, skip: 0, limit: 1 } })
		);

		const wrapper = mount(DashboardPage, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return { wrapper };
	};

	it("renders the dashboard title", async () => {
		const { wrapper } = setup();
		await flushPromises();

		expect(wrapper.find("[data-testid='dashboard-title']").exists()).toBe(true);
	});

	it("shows empty state when no news", async () => {
		const { wrapper } = setup();
		await flushPromises();

		expect(wrapper.find("[data-testid='empty-state-news']").exists()).toBe(true);
	});

	it("shows news cards when news exist", async () => {
		const { wrapper } = setup({ news: [newsResponseFactory.build(), newsResponseFactory.build()] });
		await flushPromises();

		const newsCards = wrapper.findAll("[data-testid='container_of_element']");
		expect(newsCards.length).toBeGreaterThan(0);
	});

	it("shows DashBoardTasks for teachers", async () => {
		const { wrapper } = setup({ roleName: RoleName.TEACHER });

		expect(wrapper.findComponent({ name: "DashBoardTasks" }).exists()).toBe(true);
	});

	it("shows DashBoardTasks for students", async () => {
		const { wrapper } = setup({ roleName: RoleName.STUDENT });

		expect(wrapper.findComponent({ name: "DashBoardTasks" }).exists()).toBe(true);
	});

	it("does not show DashBoardTasks for other roles", async () => {
		const { wrapper } = setup();

		expect(wrapper.findComponent({ name: "DashBoardTasks" }).exists()).toBe(false);
	});
});
