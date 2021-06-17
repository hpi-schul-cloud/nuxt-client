import MintEcPageHeader from "./MintEcPageHeader";
import BaseContentContainer from "@components/base/BaseContentContainer";

describe("@components/molecules/MintEcPageHeader", () => {
	it(...isValidComponent(MintEcPageHeader));

	it("image exists", () => {
		const wrapper = mount(MintEcPageHeader, {
			propsData: {
				heading: "heading",
				image:
					"https://headless.hpi-schul-cloud.de/content/images/2019/12/04_im-projekt-engagieren.png",
			},
		});
		expect(wrapper.find(".hero-image").exists()).toBe(true);
		expect(wrapper.props("image")).toBe(
			"https://headless.hpi-schul-cloud.de/content/images/2019/12/04_im-projekt-engagieren.png"
		);
	});

	it("base content container gets rendered", () => {
		const wrapper = mount(MintEcPageHeader, {
			propsData: {
				heading: "heading",
			},
		});
		expect(wrapper.findComponent(BaseContentContainer).exists()).toBe(true);
		expect(wrapper.find(".custom-heading-style").exists()).toBe(true);
		expect(wrapper.find(".teaser").exists()).toBe(true);
	});
});
