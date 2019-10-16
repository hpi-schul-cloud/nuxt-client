import TextEditor from "./TextEditor";

function getMock() {
	return new Promise((resolve) => {
		const wrapper = mount({
			data: () => ({ content: "" }),
			template: `<text-editor v-model="content"/>`,
			components: { TextEditor },
		});
		wrapper.vm.$nextTick(() => {
			resolve(wrapper);
		});
	});
}

describe("@components/BaseTextarea", () => {
	it(...isValidComponent(TextEditor));

	/*
	it("changing the element's value, updates the v-model", async () => {
		// TODO
		// currently not possible to implement because I don't know how to
		// simulate type events on an [contenteditable] field.
	});
	*/

	it("changing the v-model, updates the element's value", async () => {
		const testInput = "<p>test string</p>";
		const wrapper = await getMock();
		wrapper.setData({ content: testInput });
		const editorContent = wrapper.find(`[contenteditable]`).element.innerHTML;
		expect(editorContent).toBe(testInput.toString());
	});

	/*
	it("can insert an image", async () => {
		const testUrl = "https://image.url";
		window.prompt = jest.fn().mockImplementation(() => testUrl);
		const wrapper = await getMock();
		const addImageButton = wrapper.find(".menubar button:last-of-type");
		addImageButton.trigger("click"); // TypeError: root.getSelection is not a function
		const image = wrapper.find(`[contenteditable] img`);
		expect(image.getAttribute("href")).toBe(testUrl);
	});
	*/
});
