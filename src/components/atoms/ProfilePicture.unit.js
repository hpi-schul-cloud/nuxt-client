import ProfilePicture from "./ProfilePicture";

const getMocks = () =>
	createComponentMocks({
		i18n: true,
	});

describe("@components/atoms/ProfilePicture", () => {
	it(...isValidComponent(ProfilePicture));

	it("Render with a src and default size", () => {
		const wrapper = mount(ProfilePicture, {
			...getMocks(),
			propsData: {
				image: "test",
			},
		});
		expect(wrapper.find("img").classes("small")).toBe(true);
	});
});
