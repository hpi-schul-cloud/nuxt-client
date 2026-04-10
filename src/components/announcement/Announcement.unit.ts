import Announcement from "./Announcement.vue";
import { mockApi, mockApiResponse } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import * as serverApi from "@api-server";
import { LanguageType, RuntimeConfigApiInterface, RuntimeConfigListResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { ref } from "vue";

let runtimeConfigApi: Mocked<RuntimeConfigApiInterface>;

const mockLocale = ref<LanguageType>(LanguageType.DE);
vi.mock("@/plugins/i18n", () => ({
	useI18nGlobal: () => ({
		locale: mockLocale,
	}),
}));

const mockUserRoles = ref<string[]>(["teacher"]);
vi.mock("@data-app", () => ({
	useAppStore: () => ({
		userRoles: mockUserRoles.value,
	}),
}));

describe("Announcement", () => {
	const mockRuntimeConfigResponse = (
		options: {
			enabled?: boolean;
			roles?: string;
			textDe?: string;
			textEn?: string;
			textEs?: string;
			textUk?: string;
		} = {}
	) => {
		const {
			enabled = false,
			roles = "teacher,admin",
			textDe = "Ankündigung auf Deutsch",
			textEn = "Announcement in English",
			textEs = "Anuncio en español",
			textUk = "Оголошення українською",
		} = options;

		const data: { data: Array<{ key: string; value: unknown }> } = {
			data: [
				{ key: "DASHBOARD_ANNOUNCEMENT_ENABLED", value: enabled },
				{ key: "DASHBOARD_ANNOUNCEMENT_FOR_ROLES", value: roles },
				{ key: "DASHBOARD_ANNOUNCEMENT_TEXT_DE", value: textDe },
				{ key: "DASHBOARD_ANNOUNCEMENT_TEXT_EN", value: textEn },
				{ key: "DASHBOARD_ANNOUNCEMENT_TEXT_ES", value: textEs },
				{ key: "DASHBOARD_ANNOUNCEMENT_TEXT_UK", value: textUk },
			],
		};

		runtimeConfigApi.runtimeConfigControllerGetRuntimeConfig.mockResolvedValue(
			mockApiResponse({ data: data as RuntimeConfigListResponse })
		);
	};

	const setup = () => {
		const wrapper = shallowMount(Announcement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	beforeEach(() => {
		runtimeConfigApi = mockApi<RuntimeConfigApiInterface>();
		vi.spyOn(serverApi, "RuntimeConfigApiFactory").mockReturnValue(runtimeConfigApi);
		setActivePinia(createTestingPinia({ stubActions: false }));
		mockLocale.value = LanguageType.DE;
		mockUserRoles.value = ["teacher"];
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when announcement is disabled", () => {
		it("should not render the alert", async () => {
			mockRuntimeConfigResponse({ enabled: false });

			const { wrapper } = setup();
			await flushPromises();

			const alert = wrapper.find('[data-testid="dashboard-announcement-alert"]');
			expect(alert.exists()).toBe(false);
		});
	});

	describe("when announcement is enabled", () => {
		describe("and user role matches", () => {
			it.each([
				{ locale: LanguageType.DE, expectedText: "Ankündigung auf Deutsch" },
				{ locale: LanguageType.EN, expectedText: "Announcement in English" },
				{ locale: LanguageType.ES, expectedText: "Anuncio en español" },
				{ locale: LanguageType.UK, expectedText: "Оголошення українською" },
			])("should render the alert with correct text when locale is $locale", async ({ locale, expectedText }) => {
				mockRuntimeConfigResponse({ enabled: true });
				mockLocale.value = locale;
				mockUserRoles.value = ["teacher"];

				const { wrapper } = setup();
				await flushPromises();

				const alert = wrapper.find('[data-testid="dashboard-announcement-alert"]');
				expect(alert.exists()).toBe(true);
				expect(alert.text()).toBe(expectedText);
			});
		});

		describe("and user role does not match", () => {
			it("should not render the alert", async () => {
				mockRuntimeConfigResponse({ enabled: true, roles: "admin" });
				mockUserRoles.value = ["student"];

				const { wrapper } = setup();
				await flushPromises();

				const alert = wrapper.find('[data-testid="dashboard-announcement-alert"]');
				expect(alert.exists()).toBe(false);
			});
		});

		describe("and user has multiple roles", () => {
			it("should render the alert if any role matches", async () => {
				mockRuntimeConfigResponse({ enabled: true, roles: "teacher,admin" });
				mockUserRoles.value = ["student", "teacher"];

				const { wrapper } = setup();
				await flushPromises();

				const alert = wrapper.find('[data-testid="dashboard-announcement-alert"]');
				expect(alert.exists()).toBe(true);
			});
		});
	});

	describe("when API returns no data", () => {
		it("should not render the alert", async () => {
			const emptyData: { data: Array<{ key: string; value: unknown }> | undefined } = { data: undefined };

			runtimeConfigApi.runtimeConfigControllerGetRuntimeConfig.mockResolvedValue(
				mockApiResponse({ data: emptyData as RuntimeConfigListResponse })
			);

			const { wrapper } = setup();
			await flushPromises();

			const alert = wrapper.find('[data-testid="dashboard-announcement-alert"]');
			expect(alert.exists()).toBe(false);
		});
	});
});
