import LanguageMenu from "./LanguageMenu.vue";
import { LanguageType } from "@/serverApi/v3";
import { createTestEnvStore, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeAll } from "vitest";

describe("@ui-layout/LanguageMenu", () => {
	beforeAll(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({
			I18N__AVAILABLE_LANGUAGES: [LanguageType.De, LanguageType.En],
		});
	});

	const setup = (attrs = {}) => {
		const wrapper = mount(LanguageMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...attrs,
		});

		return { wrapper };
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
			const appStore = mockedPiniaStoreTyping(useAppStore);
			const { wrapper } = setup();

			const selectedItem = wrapper.find('[data-testid="selected-language-de"]');
			await selectedItem.trigger("click");
			const availableItem = wrapper.find('[data-testid="available-language-en"]');
			await availableItem.trigger("click");
			expect(appStore.updateUserLanguage).toHaveBeenCalledWith("en");
			expect(window.location.reload).toHaveBeenCalled();
		});
	});
});
