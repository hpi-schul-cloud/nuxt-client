import Announcement from "./Announcement.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { LanguageType } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { ref } from "vue";

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

const mockRuntimeConfig = ref<Record<string, unknown>>({
	DASHBOARD_ANNOUNCEMENT_ENABLED: true,
	DASHBOARD_ANNOUNCEMENT_FOR_ROLES: "teacher,admin",
	DASHBOARD_ANNOUNCEMENT_TEXT_DE: "Ankündigung auf <strong>Deutsch</strong>",
	DASHBOARD_ANNOUNCEMENT_TEXT_EN: "Announcement in <strong>English</strong>",
	DASHBOARD_ANNOUNCEMENT_TEXT_ES: "Anuncio en <strong>español</strong>",
	DASHBOARD_ANNOUNCEMENT_TEXT_UK: "Оголошення <strong>українською</strong>",
});

vi.mock("@data-runtime-config", () => ({
	useRuntimeConfigStore: () => ({
		runtimeConfig: mockRuntimeConfig.value,
	}),
}));

describe("Announcement", () => {
	const setup = () => {
		const wrapper = shallowMount(Announcement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					"base-alert": false,
					"render-h-t-m-l": false,
					InfoAlert: false,
				},
			},
		});

		return { wrapper };
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		mockLocale.value = LanguageType.DE;
		mockUserRoles.value = ["teacher"];
		mockRuntimeConfig.value = {
			DASHBOARD_ANNOUNCEMENT_ENABLED: true,
			DASHBOARD_ANNOUNCEMENT_FOR_ROLES: "teacher,admin",
			DASHBOARD_ANNOUNCEMENT_TEXT_DE: "Ankündigung auf <strong>Deutsch</strong>",
			DASHBOARD_ANNOUNCEMENT_TEXT_EN: "Announcement in <strong>English</strong>",
			DASHBOARD_ANNOUNCEMENT_TEXT_ES: "Anuncio en <strong>español</strong>",
			DASHBOARD_ANNOUNCEMENT_TEXT_UK: "Оголошення <strong>українською</strong>",
		};
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when announcement is disabled", () => {
		it("should not render the alert", async () => {
			mockRuntimeConfig.value.DASHBOARD_ANNOUNCEMENT_ENABLED = false;

			const { wrapper } = setup();
			await flushPromises();

			const alert = wrapper.find('[data-testid="dashboard-announcement-alert"]');
			expect(alert.exists()).toBe(false);
		});
	});

	describe("when announcement is enabled", () => {
		describe("and user role matches", () => {
			it.each([
				{ locale: LanguageType.DE, expectedHTML: "Ankündigung auf <strong>Deutsch</strong>" },
				{ locale: LanguageType.EN, expectedHTML: "Announcement in <strong>English</strong>" },
				{ locale: LanguageType.ES, expectedHTML: "Anuncio en <strong>español</strong>" },
				{ locale: LanguageType.UK, expectedHTML: "Оголошення <strong>українською</strong>" },
			])("should render the alert with correct HTML when locale is $locale", async ({ locale, expectedHTML }) => {
				mockLocale.value = locale;
				mockUserRoles.value = ["teacher"];

				const { wrapper } = setup();
				await flushPromises();

				const alert = wrapper.find('[data-testid="dashboard-announcement-alert"]');
				const alertInnerDiv = alert.find(".alert-text div");

				expect(alertInnerDiv.exists()).toBe(true);
				expect(alertInnerDiv.html()).toContain(expectedHTML);
			});
		});

		describe("and user role does not match", () => {
			it("should not render the alert", async () => {
				mockRuntimeConfig.value.DASHBOARD_ANNOUNCEMENT_FOR_ROLES = "admin";
				mockUserRoles.value = ["student"];

				const { wrapper } = setup();
				await flushPromises();

				const alert = wrapper.find('[data-testid="dashboard-announcement-alert"]');
				expect(alert.exists()).toBe(false);
			});
		});

		describe("and user has multiple roles", () => {
			it("should render the alert if any role matches", async () => {
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
			mockRuntimeConfig.value = {};

			const { wrapper } = setup();
			await flushPromises();

			const alert = wrapper.find('[data-testid="dashboard-announcement-alert"]');
			expect(alert.exists()).toBe(false);
		});
	});
});
