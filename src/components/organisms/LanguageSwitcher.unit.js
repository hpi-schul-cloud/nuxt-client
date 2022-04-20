import LanguageSwitcher from "./LanguageSwitcher";
import { authModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import AuthModule from "@/store/auth";

describe("@components/organisms/LanguageSwitcher", () => {
	beforeEach(() => {
		setupStores({ auth: AuthModule });
	});

	it(...isValidComponent(LanguageSwitcher));

	it("Changes language", () => {
		const wrapper = shallowMount(LanguageSwitcher, {
			propsData: {
				value: "de",
			},
			...createComponentMocks({
				user: true,
				i18n: true,
			}),
		});
		expect(authModule.getLocale).toBe("de");
		wrapper.find("p[label=English]").trigger("click");
		expect(authModule.getLocale).toBe("en");
	});
});
