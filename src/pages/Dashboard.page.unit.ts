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
import { NewsApiInterface, NewsResponse, ReleaseItemResponse, RoleName, ServerReleaseApiInterface } from "@api-server";
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
		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
		setActivePinia(createTestingPinia({ stubActions: false }));

		newsApi = mockApi<NewsApiInterface>();
		releasesApi = mockApi<ServerReleaseApiInterface>();

		vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(newsApi);
		vi.spyOn(serverApi, "ServerReleaseApiFactory").mockReturnValue(releasesApi);
	});

	const setup = (options?: {
		roleName?: RoleName;
		news?: NewsResponse[];
		releaseDate?: string;
		latestReleasePublishedAt?: string;
	}) => {
		createTestAppStore({
			me: {
				roles: options?.roleName ? [{ id: options.roleName, name: options.roleName }] : [],
				preferences: options?.releaseDate ? { releaseDate: options.releaseDate } : undefined,
			},
		});

		newsApi.newsControllerFindAll.mockResolvedValue(
			mockApiResponse({
				data: { data: options?.news ?? [], total: options?.news?.length ?? 0, skip: 0, limit: 4 },
			})
		);

		const releaseData = options?.latestReleasePublishedAt
			? [{ id: "release-1", publishedAt: options.latestReleasePublishedAt } as ReleaseItemResponse]
			: [];

		releasesApi.serverReleaseControllerGetReleases.mockResolvedValue(
			mockApiResponse({
				data: { data: releaseData, total: releaseData.length, skip: 0, limit: 1 },
			})
		);

		const wrapper = mount(DashboardPage, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()], stubs: ["DashBoardTasks"] },
		});

		return { wrapper };
	};

	it("renders the dashboard title", async () => {
		const { wrapper } = setup();
		await flushPromises();

		expect(wrapper.find("[data-testid='dashboard-title']").exists()).toBe(true);
	});

	describe("dashboard news", () => {
		it("shows empty state when no news", async () => {
			const { wrapper } = setup({ news: [] });
			await flushPromises();

			expect(wrapper.find("[data-testid='empty-state-news']").exists()).toBe(true);
		});

		it("shows news cards when news exist", async () => {
			const news = [newsResponseFactory.build(), newsResponseFactory.build()];
			const { wrapper } = setup({ news });
			await flushPromises();

			const newsCards = wrapper.findAll("[data-testid='container_of_element']");
			expect(newsCards).toHaveLength(news.length);
		});
	});

	describe("dashboard tasks", () => {
		it("shows DashBoardTasks for teachers", async () => {
			const { wrapper } = setup({ roleName: RoleName.TEACHER });
			await flushPromises();

			expect(wrapper.findComponent({ name: "DashBoardTasks" }).exists()).toBe(true);
		});

		it("shows DashBoardTasks for students", async () => {
			const { wrapper } = setup({ roleName: RoleName.STUDENT });
			await flushPromises();

			expect(wrapper.findComponent({ name: "DashBoardTasks" }).exists()).toBe(true);
		});

		it("does not show DashBoardTasks for other roles", async () => {
			const { wrapper } = setup();
			await flushPromises();

			expect(wrapper.findComponent({ name: "DashBoardTasks" }).exists()).toBe(false);
		});
	});

	describe("release notes dialog", () => {
		it("shows the release dialog when there is a new release the user has not seen", async () => {
			const { wrapper } = setup({
				latestReleasePublishedAt: "2024-06-01T00:00:00.000Z",
				// no releaseDate preference → user has never seen any release
			});
			await flushPromises();

			expect(wrapper.findComponent({ name: "SvsDialog" }).exists()).toBe(true);
		});

		it("shows the release dialog when the latest release is newer than what the user last saw", async () => {
			const { wrapper } = setup({
				latestReleasePublishedAt: "2024-06-01T00:00:00.000Z",
				releaseDate: "2024-01-01T00:00:00.000Z", // older than the release
			});
			await flushPromises();

			expect(wrapper.findComponent({ name: "SvsDialog" }).exists()).toBe(true);
		});

		it("does not show the release dialog when the user has already seen the latest release", async () => {
			const { wrapper } = setup({
				latestReleasePublishedAt: "2024-01-01T00:00:00.000Z",
				releaseDate: "2024-06-01T00:00:00.000Z", // newer than or equal to release
			});
			await flushPromises();

			expect(wrapper.findComponent({ name: "SvsDialog" }).exists()).toBe(false);
		});

		it("does not show the release dialog when there are no releases", async () => {
			const { wrapper } = setup({});
			await flushPromises();

			expect(wrapper.findComponent({ name: "SvsDialog" }).exists()).toBe(false);
		});
	});
});
