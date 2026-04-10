import DashboardPage from "./Dashboard.page.vue";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import { initializeAxios } from "@/utils/api";
import {
	createTestAppStore,
	mockApi,
	mockApiResponse,
	mockAxiosInstance,
	newsResponseFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import {
	NewsApiInterface,
	NewsResponse,
	Permission,
	ReleaseItemResponse,
	RoleName,
	RuntimeConfigApiInterface,
	ServerReleaseApiInterface,
} from "@api-server";
import * as serverApi from "@api-server";
import { DashboardTasks } from "@feature-dashboard";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

describe("DashboardPage", () => {
	let newsApi: Mocked<NewsApiInterface>;
	let releasesApi: Mocked<ServerReleaseApiInterface>;
	let runtimeConfigApi: Mocked<RuntimeConfigApiInterface>;
	let axiosMock: Mocked<AxiosInstance>;

	beforeEach(() => {
		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
		setActivePinia(createTestingPinia({ stubActions: false }));

		newsApi = mockApi<NewsApiInterface>();
		releasesApi = mockApi<ServerReleaseApiInterface>();
		runtimeConfigApi = mockApi<RuntimeConfigApiInterface>();

		setupStores({
			schoolsModule: SchoolsModule,
		});
		schoolsModule.setSchool(schoolFactory.build());

		vi.spyOn(serverApi, "NewsApiFactory").mockReturnValue(newsApi);
		vi.spyOn(serverApi, "ServerReleaseApiFactory").mockReturnValue(releasesApi);
		vi.spyOn(serverApi, "RuntimeConfigApiFactory").mockReturnValue(runtimeConfigApi);
	});

	const setup = (options?: {
		roleName?: RoleName;
		news?: NewsResponse[];
		releaseDate?: string;
		latestReleasePublishedAt?: string;
		permissions?: Permission[];
		schoolInMaintenance?: boolean;
		schoolInMigration?: boolean;
	}) => {
		createTestAppStore({
			me: {
				roles: options?.roleName ? [{ id: options.roleName, name: options.roleName }] : [],
				preferences: options?.releaseDate ? { releaseDate: options.releaseDate } : undefined,
				permissions: options?.permissions ?? [],
			},
		});

		schoolsModule.setSchool(
			schoolFactory.build({
				inMaintenance: options?.schoolInMaintenance ?? false,
				inUserMigration: options?.schoolInMigration ?? false,
			})
		);

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
			global: { plugins: [createTestingVuetify(), createTestingI18n()], stubs: ["DashboardTasks"] },
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

			const newsCards = wrapper.findAll("[data-testid='news-card-item']");
			expect(newsCards).toHaveLength(news.length);
		});
	});

	describe("dashboard tasks", () => {
		it("shows DashboardTasks for teachers", async () => {
			const { wrapper } = setup({ roleName: RoleName.TEACHER });
			await flushPromises();

			expect(wrapper.findComponent(DashboardTasks).exists()).toBe(true);
		});

		it("shows DashboardTasks for students", async () => {
			const { wrapper } = setup({ roleName: RoleName.STUDENT });
			await flushPromises();

			expect(wrapper.findComponent(DashboardTasks).exists()).toBe(true);
		});

		it("does not show DashboardTasks for other roles", async () => {
			const { wrapper } = setup();
			await flushPromises();

			expect(wrapper.findComponent(DashboardTasks).exists()).toBe(false);
		});
	});

	describe("inMaintenanceOrMigrationText", () => {
		it("shows migration warning for admin with IMPORT_USER_VIEW permission when school is in migration", async () => {
			const { wrapper } = setup({
				roleName: RoleName.ADMINISTRATOR,
				permissions: [Permission.IMPORT_USER_VIEW],
				schoolInMigration: true,
			});
			await flushPromises();

			const warningAlert = wrapper.findComponent({ name: "WarningAlert" });
			expect(warningAlert.exists()).toBe(true);
		});

		it("shows maintenance warning for admin when school is in maintenance", async () => {
			const { wrapper } = setup({
				roleName: RoleName.ADMINISTRATOR,
				schoolInMaintenance: true,
			});
			await flushPromises();

			const warningAlert = wrapper.findComponent({ name: "WarningAlert" });
			expect(warningAlert.exists()).toBe(true);
		});

		it("does not show warning when school is neither in maintenance nor migration", async () => {
			const { wrapper } = setup({
				roleName: RoleName.ADMINISTRATOR,
			});
			await flushPromises();

			const warningAlert = wrapper.findComponent({ name: "WarningAlert" });
			expect(warningAlert.exists()).toBe(false);
		});
	});
});
