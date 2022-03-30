import LanguageMenu from "./LanguageMenu";
import Vuetify from "vuetify";
import { EnvConfig as EnvConfigModule } from "@/store/env-config";
import { createModuleMocks } from "@/utils/mock-store-module";

const mockEnvConfigModule = jest.fn();
jest.mock("@store/env-config", () => ({
	...jest.requireActual("@store/env-config"),
	__esModule: true,
	get default() {
		return mockEnvConfigModule();
	},
}));

// const mockAuthModule = jest.fn();
// jest.mock("@store/auth", () => ({
// 	...jest.requireActual("@store/auth"),
// 	__esModule: true,
// 	get default() {
// 		return mockAuthModule();
// 	},
// }));

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
	});

	it(...isValidComponent(LanguageMenu));

	describe("with availble languages", () => {
		let wrapper;
		let envConfigModuleMock;

		beforeEach(() => {
			envConfigModuleMock = {
				...createModuleMocks(EnvConfigModule),
				getStatus: "completed",
				getAvailableLanguages: "de,en",
			};
			mockEnvConfigModule.mockReturnValue(envConfigModuleMock);

			wrapper = mountComponent();
		});

		it("should provide available language items", () => {
			expect(wrapper.vm.availableItems).toStrictEqual([
				{
					language: "en",
					name: "English",
					icon: "$langIconEn",
				},
			]);
		});

		it("should provide selected language item", () => {
			expect(wrapper.vm.selectedItem).toStrictEqual({
				language: "de",
				name: "Deutsch",
				icon: "$langIconDe",
			});
		});
	});
});
