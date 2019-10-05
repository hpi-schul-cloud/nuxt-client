import LandingCTA from "./LandingCTA";

describe("@components/molecules/LandingCTA", () => {
	it(...isValidComponent(LandingCTA));

	it("Render text props", () => {
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
