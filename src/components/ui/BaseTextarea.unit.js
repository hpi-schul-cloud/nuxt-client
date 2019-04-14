import BaseTextarea from "./BaseTextarea";

function getMock() {
	return mount({
		data: () => ({ content: "" }),
		template: `<base-textarea v-model="content" label="test" name="test"/>`,
		components: { BaseTextarea },
	});
}

describe("@components/BaseTextarea", () => {
	it("textarea has label", () => {
		const wrapper = getMock();
		expect(wrapper.find(`label`).element.innerHTML.includes("test")).toBeTruthy;
	});

	it("changing the element's value, updates the v-model", () => {
		const testInput = "test string";
		const wrapper = getMock();
		const input = wrapper.find(`textarea`);
		input.setValue(testInput);
		expect(wrapper.vm.content).toBe(testInput);
	});

	it("changing the v-model, updates the element's value", () => {
		const testInput = "test string";
		const wrapper = getMock();
		wrapper.setData({ content: testInput });
		const input = wrapper.find(`textarea`);
		expect(input.element.value.toString()).toBe(testInput.toString());
	});
});
