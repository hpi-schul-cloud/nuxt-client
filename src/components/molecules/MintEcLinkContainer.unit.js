import MintEcLinkContainer from "./MintEcLinkContainer";

describe("@components/MintEcLinkContainer", () => {
	it(...isValidComponent(MintEcLinkContainer));

	it("renders image", () => {
		const wrapper = mount(MintEcLinkContainer, {
			propsData: {
				heading: "heading",
				image:
					"https://headless.schul-cloud.org/content/images/2019/12/04_im-projekt-engagieren.png",
				ic: "fas fa-paint-brush",
				href: "/mint-ec/schule-informieren",
			},
		});
		expect(wrapper.find(".image-container").exists()).toBe(true);
		expect(wrapper.props("image")).toBe(
			"https://headless.schul-cloud.org/content/images/2019/12/04_im-projekt-engagieren.png"
		);
	});
	it("page link exists", () => {
		const wrapper = mount(MintEcLinkContainer, {
			propsData: {
				href: "https:/mint-ec/schule-informieren",
			},
		});
		expect(wrapper.props().href).toBe("https:/mint-ec/schule-informieren");
	});
});
