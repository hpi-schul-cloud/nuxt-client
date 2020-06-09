import TextEditor from "./TextEditor";

import faker from "faker/locale/en";
// set a seed to have a consistent fake for the screenshot tests
faker.seed(512); // any static number will do the job
const base64Image = faker.image.dataUri(1, 1);

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

describe("@components/molecules/BaseTextarea", () => {
	it(...isValidComponent(TextEditor));

	// TODO:
	// currently not possible to implement because I don't know how to
	// simulate type events on an [contenteditable] field.
	it.todo("changing the element's value, updates the v-model");

	it("changing the v-model, updates the element's value", async () => {
		const before = `<p>before</p>`;
		const after = `<p>after</p>`;
		const wrapper = await getMock({ data: () => ({ content: before }) });
		const contentContainer = wrapper.find(`[contenteditable]`);
		expect(contentContainer.html()).toStrictEqual(
			expect.stringContaining(before)
		);
		wrapper.setData({ content: after });
		await wrapper.vm.$nextTick();
		expect(contentContainer.html()).toStrictEqual(
			expect.not.stringContaining(before)
		);
		expect(contentContainer.html()).toStrictEqual(
			expect.stringContaining(after)
		);
	});

	it("showImagePrompt calls callback with src", async () => {
		// Make sure all expects get executed
		expect.assertions(1);
		// only test the method itself, the button click would create `TypeError: root.getSelection is not a function`
		const testUrl = "https://image.url";
		jest.spyOn(window, "prompt").mockImplementation(() => testUrl);
		const wrapper = await getMock();
		await new Promise((resolve) => {
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
		expect(mockFn.mock.calls).toHaveLength(1);
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
				expect(wrapper.find(`${selector}[disabled]`).exists()).toBe(true);
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
			expect(wrapper.find(`${selector}:not([disabled])`).exists()).toBe(true);
		});
	});

	it("isInvalid() - external img src's are NOT detected as invalid", async () => {
		const validContent = `<img role="presentation" src="https://source.unsplash.com/random">`;
		const wrapper = mount(TextEditor, {
			...createComponentMocks({ i18n: true }),
			propsData: { value: "" },
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.isInvalid(validContent)).toBe(false);
	});

	it("isInvalid() - data-url img src's are detected as invalid", async () => {
		const invalidContent = `<img role="presentation" src="${base64Image}">`;
		const wrapper = mount(TextEditor, {
			...createComponentMocks({ i18n: true }),
			propsData: { value: "" },
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.isInvalid(invalidContent)).not.toBe(false);
	});

	it("triggers Toast and Undo on error", async () => {
		const invalidContent = `<img role="presentation" src="${base64Image}">`;
		const wrapper = mount(TextEditor, {
			...createComponentMocks({ i18n: true }),
			propsData: { value: "" },
		});
		const { editorUpdateHandler } = wrapper.vm;

		const undoStub = jest.fn();
		const toastStub = jest.fn();
		wrapper.vm.$toast = {};
		wrapper.vm.$toast.error = toastStub;
		wrapper.vm.editor.commands.undo = undoStub;

		editorUpdateHandler({ getHTML: () => invalidContent });

		expect(undoStub.mock.calls).toHaveLength(1);
		expect(toastStub.mock.calls).toHaveLength(1);
		expect(wrapper.emitted("update")).toBeUndefined();
	});

	it("emits update for valid content", async () => {
		const validContent = `<img role="presentation" src="https://source.unsplash.com/random">`;
		const wrapper = mount(TextEditor, {
			...createComponentMocks({ i18n: true }),
			propsData: { value: "" },
		});

		const { editorUpdateHandler } = wrapper.vm;

		const undoStub = jest.fn();
		const toastStub = jest.fn();
		wrapper.vm.$toast = {};
		wrapper.vm.$toast.error = toastStub;
		wrapper.vm.editor.commands.undo = undoStub;

		editorUpdateHandler({ getHTML: () => validContent });

		expect(undoStub.mock.calls).toHaveLength(0);
		expect(toastStub.mock.calls).toHaveLength(0);
		expect(wrapper.emitted("update")[0][0]).toStrictEqual(validContent);
	});
});
