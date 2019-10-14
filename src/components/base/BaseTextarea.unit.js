import BaseTextarea from "./BaseTextarea";
function getMock(attributes) {
	return mount({
		data: () => ({ content: "" }),
		template: `<base-textarea v-model="content" label="test" name="test" ${attributes}/>`,
		components: { BaseTextarea },
	});
}

describe("@components/BaseTextarea", () => {
	it(...isValidComponent(BaseTextarea));

	it("textarea has label", () => {
		const wrapper = getMock();
		expect(wrapper.find(`label`).element.innerHTML.includes("test")).toBeTruthy;
	});

	it("changing the element's value, updates the v-model", () => {
		const testInput = "test string";
		const wrapper = getMock();
		const input = wrapper.find("textarea");
		input.setValue(testInput);
		expect(wrapper.vm.content).toBe(testInput);
	});

	it("changing the v-model, updates the element's value", () => {
		const testInput = "test string";
		const wrapper = getMock();
		wrapper.setData({ content: testInput });
		const input = wrapper.find("textarea");
		expect(input.element.value.toString()).toBe(testInput.toString());
	});

	it("can set a row number", () => {
		const wrapper = getMock(" :rows='4' ");
		const input = wrapper.find("textarea");
		expect(input.attributes("rows")).toBe("4");
	});

	it("truncates pasted content to maximum row limit", () => {
		const wrapper = getMock(" :maxRows='1' ");
		const input = wrapper.find("textarea");
		input.trigger("paste", {
			clipboardData: { getData: () => "test \n string" },
		});
		expect(wrapper.vm.content).toBe("test ");
	});

	it("can set a maximum character limit", () => {
		const wrapper = getMock(" :maxLength='4' ");
		const input = wrapper.find("textarea");
		expect(input.attributes("maxlength")).toBe("4");
	});

	it("can be disabled", () => {
		const wrapper = getMock("disabled");
		const input = wrapper.find("textarea");
		input.setValue("test");
		expect(wrapper.vm.content).not.toBe("test");
	});
});
