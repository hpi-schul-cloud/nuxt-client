import LanguageSwitcher from "./LanguageSwitcher";
import AuthModule from "@/store/auth";

describe("@components/organisms/LanguageSwitcher", () => {
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
		expect(AuthModule.getLocale).toBe("de");
		wrapper.find("p[label=English]").trigger("click");
		expect(AuthModule.getLocale).toBe("en");
	});
});
