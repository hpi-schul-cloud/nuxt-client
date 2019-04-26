import ProfilePicture from "./ProfilePicture";

describe("@components/ProfilePicture", () => {
	it(...isValidComponent(ProfilePicture));

	it("Render with a src and default size", () => {
		const wrapper = shallowMount(ProfilePicture, {
			propsData: {
				image: "test",
			},
		});
		expect(wrapper.find("img").classes("small")).toBe(true);
	});

	it("Render with a src and specified size", () => {
		const wrapper = shallowMount(ProfilePicture, {
			propsData: {
				image: "test",
				size: "large",
			},
		});
		expect(wrapper.find("img").classes("large")).toBe(true);
	});
});
