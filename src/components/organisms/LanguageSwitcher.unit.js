import LanguageSwitcher from "./LanguageSwitcher";

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
		expect(wrapper.vm.$store.state.auth.locale).toBe("de");
		wrapper.find("p[label=English]").trigger("click");
		expect(wrapper.vm.$store.state.auth.locale).toBe("en");
	});
});
