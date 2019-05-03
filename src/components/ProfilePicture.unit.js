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
});
