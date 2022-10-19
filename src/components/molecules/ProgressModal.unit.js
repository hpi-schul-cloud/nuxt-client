import ProgressModal from "./ProgressModal";

describe("@/components/molecules/ProgressModal", () => {
	it(...isValidComponent(ProgressModal));
	it(`check props are set correctly `, () => {
		const wrapper = mount(ProgressModal, {
			propsData: {
				title: "title",
				description: "description",
				active: true,
				percent: 50,
			},
		});
		expect(wrapper.text()).toContain("title");
		expect(wrapper.text()).toContain("description");
	});
});
