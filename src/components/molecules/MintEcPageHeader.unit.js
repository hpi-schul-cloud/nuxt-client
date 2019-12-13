import MintEcPageHeader from "./MintEcPageHeader";
import BaseContentContainer from "@components/base/BaseContentContainer";

describe("@components/MintEcPageHeader", () => {
	it(...isValidComponent(MintEcPageHeader));

	it("image exists", () => {
		const wrapper = mount(MintEcPageHeader, {
			propsData: {
				heading: "heading",
				image:
					"https://headless.schul-cloud.org/content/images/2019/12/04_im-projekt-engagieren.png",
			},
		});
		expect(wrapper.find(".hero-image").exists()).toBe(true);
		expect(wrapper.props("image")).toBe(
			"https://headless.schul-cloud.org/content/images/2019/12/04_im-projekt-engagieren.png"
		);
	});

	it("base content container gets rendered", () => {
		const wrapper = mount(MintEcPageHeader, {
			propsData: {
				heading: "heading",
			},
		});
		expect(wrapper.find(BaseContentContainer).exists()).toBe(true);
		expect(wrapper.find(".custom-heading-style").exists()).toBe(true);
		expect(wrapper.find(".teaser").exists()).toBe(true);
	});
});
