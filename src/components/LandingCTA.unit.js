import LandingCTA from "./LandingCTA";

describe("@components/LandingCTA", () => {
	it(...isValidComponent(LandingCTA));

	it("Render with defaults", () => {
		const wrapper = shallowMount(LandingCTA);
		expect(wrapper.find("img").exists()).toBe(true);
		expect(wrapper.find("base-button-stub").exists()).toBe(true);
	});

	it("Render with some text", () => {
		const testTitle = "Test Title";
		const testSubTitle = "Test Sub";
		const wrapper = shallowMount(LandingCTA, {
			propsData: {
				title: testTitle,
				subtitle: testSubTitle,
				ctaText: "Button test text",
			},
		});
		expect(wrapper.find(".title").text()).toBe(testTitle);
		expect(wrapper.find(".subtitle").text()).toBe(testSubTitle);
	});

	//TODO the button should do something at some point. Test it :)
});
