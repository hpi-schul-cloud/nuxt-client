import SkipLinks from "./SkipLinks";

describe("@components/molecules/SkipLinks", () => {
	it(...isValidComponent(SkipLinks));

	it("Should render its skip link", () => {
		const wrapper = mount(SkipLinks, {
			...createComponentMocks({
				i18n: true,
			}),
		});

		expect(wrapper.find("#skip-link").exists()).toBe(true);
	});
});
