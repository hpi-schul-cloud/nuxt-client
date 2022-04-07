import LanguageMenu from "./LanguageMenu";
import Vuetify from "vuetify";
import { EnvConfig as EnvConfigModule } from "@/store/env-config";
import { Auth as AuthModule } from "@/store/auth";
import { createModuleMocks } from "@/utils/mock-store-module";

const mockEnvConfigModule = jest.fn();
jest.mock("@store/env-config", () => ({
	...jest.requireActual("@store/env-config"),
	__esModule: true,
	get default() {
		return mockEnvConfigModule();
	},
}));

const mockAuthModule = jest.fn();
jest.mock("@store/auth", () => ({
	...jest.requireActual("@store/auth"),
	__esModule: true,
	get default() {
		return mockAuthModule();
	},
}));

describe("@components/templates/LanguageMenu", () => {
	let vuetify;

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(LanguageMenu, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
		vuetify = new Vuetify();

		Object.defineProperty(window, "location", {
			configurable: true,
			value: { reload: jest.fn() },
		});
	});

	it(...isValidComponent(LanguageMenu));

	describe("with available languages", () => {
		let wrapper;
		let envConfigModuleMock;
		let authModuleMock;

		beforeEach(() => {
			envConfigModuleMock = {
				...createModuleMocks(EnvConfigModule),
				getStatus: "completed",
				getAvailableLanguages: "de,en",
			};
			mockEnvConfigModule.mockReturnValue(envConfigModuleMock);

			authModuleMock = {
				...createModuleMocks(AuthModule),
				getLocale: "de",
			};
			mockAuthModule.mockReturnValue(authModuleMock);

			wrapper = mountComponent();
		});

		it("should provide available language items", () => {
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
