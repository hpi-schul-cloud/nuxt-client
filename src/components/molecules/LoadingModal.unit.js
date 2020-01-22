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

	it(`button is centered`, () => {
		const wrapper = mount(LoadingModal, {
			propsData: {
				title: "title",
				description: "description",
				active: true,
			},
		});
		expect(wrapper.find(".mb--md").exists()).toBe(true);
	});
});
