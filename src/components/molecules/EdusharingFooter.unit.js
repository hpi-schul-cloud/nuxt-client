import EdusharingFooter from "./EdusharingFooter";

describe("@components/molecules/EdusharingFooter", () => {
	const wrapper = shallowMount(EdusharingFooter, {
		...createComponentMocks({ i18n: true }),
		data: () => ({}),
	});

	it(...isValidComponent(EdusharingFooter));

	it("Renders svg image", () => {
		expect(wrapper.find(".edusharing-footer__logo").exists()).toBe(true);
		expect(wrapper.find(".edusharing-footer__logo").attributes("alt")).toBe("edusharing-logo");
		expect(wrapper.find(".edusharing-footer__logo").attributes("src")).toBe("@assets/img/edusharing/edusharing-logo.svg");
	});

	it("Provides proper text", () => {
		expect(wrapper.find(".edusharing-footer__text").exists()).toBe(true);
		expect(wrapper.find(".edusharing-footer__text").text()).toBe("powered by");
	});
});
