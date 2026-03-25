import DashboardReleaseDialog from "./DashboardReleaseDialog.vue";
import { initializeAxios } from "@/utils/api";
import { createTestAppStore, mockApi, mockApiResponse, mockAxiosInstance } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ReleaseItemResponse, ServerReleaseApiInterface } from "@api-server";
import * as serverApi from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { flushPromises } from "@vue/test-utils";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

describe("DashBoardReleaseDialog", () => {
	let releasesApi: Mocked<ServerReleaseApiInterface>;
	let axiosMock: Mocked<AxiosInstance>;

	beforeEach(() => {
		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
		setActivePinia(createTestingPinia({ stubActions: false }));

		releasesApi = mockApi<ServerReleaseApiInterface>();

		vi.spyOn(serverApi, "ServerReleaseApiFactory").mockReturnValue(releasesApi);
	});

	const setup = (options?: { releaseDate?: string; latestReleasePublishedAt?: string }) => {
		createTestAppStore({
			me: {
				preferences: options?.releaseDate ? { releaseDate: options.releaseDate } : undefined,
			},
		});

		const releaseData = options?.latestReleasePublishedAt
			? [{ id: "release-1", publishedAt: options.latestReleasePublishedAt } as ReleaseItemResponse]
			: [];

		releasesApi.serverReleaseControllerGetReleases.mockResolvedValue(
			mockApiResponse({
				data: { data: releaseData, total: releaseData.length, skip: 0, limit: 1 },
			})
		);

		const wrapper = mount(DashboardReleaseDialog, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return { wrapper };
	};

	describe("release notes dialog", () => {
		it("shows the release dialog when there is a new release the user has not seen", async () => {
			const { wrapper } = setup({
				latestReleasePublishedAt: "2024-06-01T00:00:00.000Z",
				// no releaseDate preference → user has never seen any release
			});
			await flushPromises();

			expect(wrapper.findComponent(SvsDialog).exists()).toBe(true);
		});

		it("shows the release dialog when the latest release is newer than what the user last saw", async () => {
			const { wrapper } = setup({
				latestReleasePublishedAt: "2024-06-01T00:00:00.000Z",
				releaseDate: "2024-01-01T00:00:00.000Z", // older than the release
			});
			await flushPromises();

			expect(wrapper.findComponent(SvsDialog).exists()).toBe(true);
		});

		it("does not show the release dialog when the user has already seen the latest release", async () => {
			const { wrapper } = setup({
				latestReleasePublishedAt: "2024-01-01T00:00:00.000Z",
				releaseDate: "2024-06-01T00:00:00.000Z", // newer than or equal to release
			});
			await flushPromises();

			expect(wrapper.findComponent(SvsDialog).props("modelValue")).toBe(false);
		});

		it("does not show the release dialog when there are no releases", async () => {
			const { wrapper } = setup({});
			await flushPromises();

			expect(wrapper.findComponent(SvsDialog).props("modelValue")).toBe(false);
		});
	});
});
