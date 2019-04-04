import BaseInputSwitch from "./BaseInputSwitch";

describe("@components/BaseInputSwitch", () => {
	it(...isValidComponent(BaseInputSwitch));

	it("Check if correct input and slider are rendered", () => {
		const testLabel = "test label";
		const wrapper = shallowMount(BaseInputSwitch, {
			attrs: { label: testLabel },
		});
		expect(wrapper.find("input[type='checkbox']").exists()).toBe(true);
		expect(wrapper.find("span").classes()).toContain("slider");
		expect(wrapper.text()).toContain(testLabel);
	});

	it("Check if v model changes", () => {
		const wrapper = shallowMount(BaseInputSwitch);
		const switchInput = wrapper.find("input[type='checkbox']");
		switchInput.setChecked(false);
		expect(wrapper.vm.toggle).toBe(false);
		switchInput.setChecked(true);
		expect(wrapper.vm.toggle).toBe(true);
	});
});
