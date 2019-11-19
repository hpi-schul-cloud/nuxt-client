import BaseChip from "@components/base/BaseChip";

describe("@components/base/BaseChip", () => {
	it("exports a valid component", () => {
		expect(BaseChip).toBeAComponent();
	});

	it("renders its props", () => {
		const wrapper = mount(BaseChip);
		expect(wrapper.props("size")).toBe("medium");
		expect(wrapper.props("selected")).toBe(false);
	});

	it("renders default when not active", () => {
		const wrapper = mount(BaseChip, {
			propsData: {
				selected: false,
			},
		});
		expect(wrapper.classes()).toContain("default");
	});
	it("renders default when not active", () => {
		const wrapper = mount(BaseChip, {
			propsData: {
				selected: true,
			},
		});

		expect(wrapper.classes()).toContain("selected");
	});
});
