import LanguageMenu from "./LanguageMenu.vue";
import { LanguageType } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("@ui-layout/LanguageMenu", () => {
	const setup = (attrs = {}) => {
		createTestEnvStore({
			I18N__AVAILABLE_LANGUAGES: [LanguageType.De, LanguageType.En],
		});

		const authModuleMock = createModuleMocks(AuthModule, {
			getLocale: "de",
		});

		const wrapper = mount(LanguageMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModuleMock,
				},
			},
			...attrs,
		});

		return { wrapper, authModuleMock };
	};

	beforeEach(() => {
		Object.defineProperty(window, "location", {
			configurable: true,
			value: { reload: vi.fn() },
		});
	});

	describe("with available languages", () => {
		it("should render the selected language item", () => {
			const { wrapper } = setup();

			expect(wrapper.find("[data-testid=selected-language-de]").exists()).toBe(true);
		});

		it("should render the available language items", async () => {
			const { wrapper } = setup();

			const selectedItem = wrapper.find('[data-testid="selected-language-de"]');
			await selectedItem.trigger("click");

			expect(wrapper.findAll('[data-testid="available-language-en"]')).toHaveLength(1);
		});

		it("should update the user's language", async () => {
			const { wrapper, authModuleMock } = setup();

			const selectedItem = wrapper.find('[data-testid="selected-language-de"]');
			await selectedItem.trigger("click");
			const availableItem = wrapper.find('[data-testid="available-language-en"]');
			await availableItem.trigger("click");

			expect(authModuleMock.updateUserLanguage).toHaveBeenCalledWith("en");
			expect(window.location.reload).toHaveBeenCalled();
		});
	});
});
