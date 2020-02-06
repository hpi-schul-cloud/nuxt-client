import LoadingModal from "./LoadingModal";

describe("@components/LoadingModal", () => {
	it(...isValidComponent(LoadingModal));
	it(`check props are set correctly `, () => {
		const wrapper = mount(LoadingModal, {
			propsData: {
				title: "title",
				description: "description",
				active: true,
			},
		});
		expect(wrapper.text()).toContain("title");
		expect(wrapper.text()).toContain("description");
	});
});
