import { initializeAxios } from "@/utils/api";
import { createTestAppStore, mockApi, mockApiResponse, mockAxiosInstance } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import * as serverApi from "@api-server";
import { MeApiInterface, ReleaseApiInterface, ReleaseItemResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { flushPromises } from "@vue/test-utils";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import DashboardReleaseDialog from "./DashboardReleaseDialog.vue";

describe("DashboardReleaseDialog", () => {
	let releasesApi: Mocked<ReleaseApiInterface>;
	let meApi: Mocked<MeApiInterface>;
	let axiosMock: Mocked<AxiosInstance>;

	beforeEach(() => {
		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
		setActivePinia(createTestingPinia({ stubActions: false }));

		releasesApi = mockApi<ReleaseApiInterface>();
		meApi = mockApi<MeApiInterface>();

		vi.spyOn(serverApi, "ReleaseApiFactory").mockReturnValue(releasesApi);
		vi.spyOn(serverApi, "MeApiFactory").mockReturnValue(meApi);
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

		releasesApi.releaseControllerGetReleases.mockResolvedValue(
			mockApiResponse({
				data: { data: releaseData, total: releaseData.length, skip: 0, limit: 1 },
			})
		);

		meApi.meControllerUpdateMePreferences.mockResolvedValue(mockApiResponse({}));

		const wrapper = mount(DashboardReleaseDialog, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return { wrapper };
	};

	describe("release notes dialog", () => {
		it("does not show dialog when user has no releaseDate yet", async () => {
			const { wrapper } = setup({
				latestReleasePublishedAt: "2024-06-01T00:00:00.000Z",
			});
			await flushPromises();

			expect(wrapper.findComponent(SvsDialog).props("modelValue")).toBe(false);
		});

		it("shows the release dialog when the latest release is newer than what the user last saw", async () => {
			const { wrapper } = setup({
				latestReleasePublishedAt: "2024-06-01T00:00:00.000Z",
				releaseDate: "2024-01-01T00:00:00.000Z",
			});
			await flushPromises();

			expect(wrapper.findComponent(SvsDialog).exists()).toBe(true);
		});

		it("does not show the release dialog when the user has already seen the latest release", async () => {
			const { wrapper } = setup({
				latestReleasePublishedAt: "2024-01-01T00:00:00.000Z",
				releaseDate: "2024-06-01T00:00:00.000Z",
			});
			await flushPromises();

			expect(wrapper.findComponent(SvsDialog).props("modelValue")).toBe(false);
		});

		it("does not show the release dialog when there are no releases", async () => {
			const { wrapper } = setup({});
			await flushPromises();

			expect(wrapper.findComponent(SvsDialog).props("modelValue")).toBe(false);
		});

		it("sets releaseDate preference when user has none and release exists", async () => {
			setup({
				latestReleasePublishedAt: "2024-06-01T00:00:00.000Z",
			});
			await flushPromises();

			expect(meApi.meControllerUpdateMePreferences).toHaveBeenCalledWith({
				releaseDate: "2024-06-01T00:00:00.000Z",
			});
		});
	});
});
