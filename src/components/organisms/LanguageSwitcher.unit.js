import LanguageSwitcher from "./LanguageSwitcher";
import { authModule } from "@/store";

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
		expect(authModule.getLocale).toBe("de");
		wrapper.find("p[label=English]").trigger("click");
		expect(authModule.getLocale).toBe("en");
	});
});
