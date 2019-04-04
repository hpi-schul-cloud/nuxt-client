import BaseInputDefault from "./BaseInputDefault";
describe("@components/BaseInputDefault", () => {
	it(...isValidComponent(BaseInputDefault));
	const testLabel = "test label";
	it("changing the element's value, updates the v-model", () => {
		const testInput = "test string";
		const wrapper = shallowMount(BaseInputDefault, {
			attrs: { label: testLabel, type: "text" },
		});
		const textInput = wrapper.find("input[type='text']");
		textInput.setValue(testInput);
		expect(wrapper.vm.content).toBe(testInput);
	});
	it("Check that a label is rendered", () => {
		const wrapper = shallowMount(BaseInputDefault, {
			attrs: { label: testLabel, type: "text" },
		});
		expect(wrapper.find("label").text()).toBe(testLabel);
	});
	it("Check that the type is correctly being rendered password", () => {
		const type = "password";
		const wrapper = shallowMount(BaseInputDefault, {
			attrs: { label: testLabel, type: type },
		});
		const textInput = wrapper.find("input[type=" + type + "]");
		expect(textInput.exists()).toBe(true);
	});
});
