import LoadingModal from "./LoadingModal";

describe("@/components/molecules/LoadingModal", () => {
	it(`check props are set correctly `, () => {
		const wrapper = mount(LoadingModal, {
			propsData: {
				title: "title",
				description: "description",
				btnText: "button",
				active: true,
			},
		});
		expect(wrapper.text()).toContain("title");
		expect(wrapper.text()).toContain("description");
		expect(wrapper.text()).toContain("button");
	});
});
