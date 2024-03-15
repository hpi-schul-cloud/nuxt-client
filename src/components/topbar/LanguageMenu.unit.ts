import { Language } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import { AUTH_MODULE_KEY, ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import LanguageMenu from "./LanguageMenu.vue";

describe("@/components/topbar/LanguageMenu", () => {
	const setup = (attrs = {}) => {
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getAvailableLanguages: [Language.De, Language.En],
		});

		const authModuleMock = createModuleMocks(AuthModule, {
			getLocale: "de",
		});

		const wrapper = mount(LanguageMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModuleMock,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
				},
			},
			...attrs,
		});

		return { wrapper, envConfigModuleMock, authModuleMock };
	};

	beforeEach(() => {
		Object.defineProperty(window, "location", {
			configurable: true,
			value: { reload: jest.fn() },
		});
	});

	describe("with available languages", () => {
		it("should provide available language items", () => {
			const { wrapper } = setup();

			expect(wrapper.vm.availableItems).toStrictEqual([
				{
					language: "en",
					longName: "global.topbar.language.longName.en",
					translatedName: "common.words.languages.en",
					icon: "$langIconEn",
				},
			]);
		});

		it("should provide selected language item", () => {
			const { wrapper } = setup();

			expect(wrapper.vm.selectedItem).toStrictEqual({
				language: "de",
				longName: "global.topbar.language.longName.de",
				translatedName: "common.words.languages.de",
				icon: "$langIconDe",
			});
		});

		it("should render the selected language item", () => {
			const { wrapper } = setup();

			expect(wrapper.findAll(".v-list-item")).toHaveLength(1);
		});

		it("should render the available language items", async () => {
			const { wrapper } = setup();

			const selectedItem = wrapper.find('[data-testid="selected-language-de"]');
			await selectedItem.trigger("click");

			expect(
				wrapper.findAll('[data-testid="available-language-en"]')
			).toHaveLength(1);
		});

		it("should update the user's language", async () => {
			const { wrapper, authModuleMock } = setup();

			const selectedItem = wrapper.find('[data-testid="selected-language-de"]');
			await selectedItem.trigger("click");
			const availableItem = wrapper.find(
				'[data-testid="available-language-en"]'
			);
			await availableItem.trigger("click");

			expect(authModuleMock.updateUserLanguage).toHaveBeenCalledWith("en");
			expect(window.location.reload).toHaveBeenCalled();
		});
	});
});
