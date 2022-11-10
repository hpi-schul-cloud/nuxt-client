import TextEditor from "./TextEditor";

import faker from "faker/locale/en";
faker.seed(512); // any static number will do the job
const base64Image = faker.image.dataUri(1, 1);

function getMock(options = {}) {
	return new Promise((resolve) => {
		const wrapper = mount({
			...createComponentMocks({ i18n: true, vuetify: true }),
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

const getWrapper = (options) => {
	return mount(TextEditor, {
		...createComponentMocks({ i18n: true, vuetify: true }),
		template: `<text-editor v-model="content"/>`,
		...options,
	});
};

describe("@components/molecules/TextEditor", () => {
	it(...isValidComponent(TextEditor));

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

	it("some options are disabled when cursor is in Headings", async () => {
		const wrapper = getWrapper({
			data: () => ({ content: `<p>Hi</p>` }),
			propsData: { value: "" },
		});
		const listOptionSelectors = [
			`[data-testid="editor_format_list_bulleted"]`,
			`[data-testid="editor_format_list_numbered"]`,
			`[data-testid="editor_add_image"]`,
		];

		const h1Btn = wrapper.find("[data-testid='editor_format_h1']");
		await h1Btn.trigger("click");

		listOptionSelectors.forEach((selector) => {
			expect(wrapper.find(selector).classes("v-btn--disabled")).toBe(true);
		});

		const h2Btn = wrapper.find("[data-testid='editor_format_h2']");
		await h2Btn.trigger("click");

		listOptionSelectors.forEach((selector) => {
			expect(wrapper.find(selector).classes("v-btn--disabled")).toBe(true);
		});

		const h3Btn = wrapper.find("[data-testid='editor_format_h3']");
		await h3Btn.trigger("click");

		listOptionSelectors.forEach((selector) => {
			expect(wrapper.find(selector).classes("v-btn--disabled")).toBe(true);
		});
	});

	it("some options are enabled when cursor is outside Headings", async () => {
		const wrapper = getWrapper({
			data: () => ({ content: `<p>Hi</p>` }),
			propsData: { value: "" },
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
