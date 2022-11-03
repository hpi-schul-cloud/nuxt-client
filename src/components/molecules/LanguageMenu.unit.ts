import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, Wrapper } from "@vue/test-utils";
import LanguageMenu from "./LanguageMenu.vue";

describe("@/components/templates/LanguageMenu", () => {
	let envConfigModuleMock: EnvConfigModule;
	let authModuleMock: AuthModule;

	const mountComponent = (attrs = {}): Wrapper<Vue> => {
		const wrapper = mount(LanguageMenu, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				authModule: authModuleMock,
				envConfigModule: envConfigModuleMock,
			},
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
		Object.defineProperty(window, "location", {
			configurable: true,
			value: { reload: jest.fn() },
		});
	});

	describe("with available languages", () => {
		let wrapper: Wrapper<Vue>;

		beforeEach(() => {
			envConfigModuleMock = createModuleMocks(EnvConfigModule, {
				getAvailableLanguages: "de,en",
			});

			authModuleMock = createModuleMocks(AuthModule, {
				getLocale: "de",
			});

			wrapper = mountComponent();
		});

		it("should provide available language items", () => {
			//@ts-ignore
			expect(wrapper.vm.availableItems).toStrictEqual([
				{
					language: "en",
					longName: "English",
					translatedName: "Englisch",
					icon: "$langIconEn",
				},
			]);
		});

		it("should provide selected language item", () => {
			//@ts-ignore
			expect(wrapper.vm.selectedItem).toStrictEqual({
				language: "de",
				longName: "Deutsch",
				translatedName: "Deutsch",
				icon: "$langIconDe",
			});
		});

		it("should render the selected language item", () => {
			expect(wrapper.findAll(".v-list-item")).toHaveLength(1);
		});

		it("should render the available language items", async () => {
			const selectedItem = wrapper.find('[data-testid="selected-language-de"]');
			await selectedItem.trigger("click");
			expect(
				wrapper.findAll('[data-testid="available-language-en"]')
			).toHaveLength(1);
		});

		it("should update the user's language", async () => {
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
