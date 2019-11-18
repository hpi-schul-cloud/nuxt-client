import TextEditor from "./TextEditor";

const base64Image = `data:image/gif;base64,R0lGODdhEAAQAMwAAPj7+FmhUYjNfGuxYY
DJdYTIeanOpT+DOTuANXi/bGOrWj6CONzv2sPjv2CmV1unU4zPgISg6DJnJ3ImTh8Mtbs00aNP1CZSGy0YqLEn47RgXW8amasW
7XWsmmvX2iuXiwAAAAAEAAQAAAFVyAgjmRpnihqGCkpDQPbGkNUOFk6DZqgHCNGg2T4QAQBoIiRSAwBE4VA4FACKgkB5NGReAS
FZEmxsQ0whPDi9BiACYQAInXhwOUtgCUQoORFCGt/g4QAIQA7`;

function getMock(options = {}) {
	return new Promise((resolve) => {
		const wrapper = mount({
			data: () => ({ content: "" }),
			template: `<text-editor v-model="content"/>`,
			components: { TextEditor },
			...options,
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

	it("showImagePrompt calls callback with src", async () => {
		// only test the method itself, the button click would create `TypeError: root.getSelection is not a function`
		const testUrl = "https://image.url";
		window.prompt = jest.fn().mockImplementation(() => testUrl);
		const wrapper = await getMock();
		return new Promise((resolve) => {
			wrapper.vm.$children[0].showImagePrompt((cbValue) => {
				expect(cbValue.src).toBe(testUrl);
				resolve();
			});
		});
	});

	it("component can be destroyed", async () => {
		// only test the method itself, the button click would create `TypeError: root.getSelection is not a function`
		const mockFn = jest.fn().mockImplementation(() => true);
		const wrapper = await getMock({ destroyed: mockFn });
		wrapper.destroy();
		expect(mockFn.mock.calls.length).toBe(1);
	});

	it("some options are disabled when cursor is in Headings", async () => {
		let testInstances = ["h2", "h3", "h4"].map((tag) =>
			getMock({
				data: () => ({ content: `<${tag}>Hi</${tag}>` }),
			})
		);
		testInstances = await Promise.all(testInstances);
		const listOptionSelectors = [
			`[data-testid="editor_format_list_bulleted"]`,
			`[data-testid="editor_format_list_numbered"]`,
			`[data-testid="editor_add_image"]`,
		];
		testInstances.forEach((wrapper) => {
			listOptionSelectors.forEach((selector) => {
				expect(wrapper.contains(`${selector}[disabled]`)).toBe(true);
			});
		});
	});

	it("some options are enabled when cursor is outside Headings", async () => {
		const wrapper = await getMock({
			data: () => ({ content: `<p>Hi</p>` }),
		});
		const listOptionSelectors = [
			`[data-testid="editor_format_list_bulleted"]`,
			`[data-testid="editor_format_list_numbered"]`,
			`[data-testid="editor_add_image"]`,
		];
		listOptionSelectors.forEach((selector) => {
			expect(wrapper.contains(`${selector}:not([disabled])`)).toBe(true);
		});
	});

	it("external img src's are NOT detected as invalid", async () => {
		const validContent = `<img src="https://source.unsplash.com/random">`;
		const wrapper = mount(TextEditor, {
			...createComponentMocks({ i18n: true }),
			propsData: { value: "" },
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.isInvalid(validContent)).toBe(false);
	});

	it("data-url img src's are detected as invalid", async () => {
		const invalidContent = `<img src="${base64Image}">`;
		const wrapper = mount(TextEditor, {
			...createComponentMocks({ i18n: true }),
			propsData: { value: "" },
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.isInvalid(invalidContent)).not.toBe(false);
	});
});
