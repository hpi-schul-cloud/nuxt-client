import TextEditor from "./TextEditor";

const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAsCAMAAACUu/xGAAAAq1BMVEUAAABlZVJlZVKsrJthYU+zs6Grq5ylpZazs6FlZVJfX01lZVJlZVKsrJurq5urq5xlZVKtrZ1lZVJlZVKvr52zs6GysqCoqJeqqpmzs6Grq5xlZVJgYE6zs6Gnp5mrq5yiopRjY1CRkX2rq5yzs6FlZVKRkX2goJKKineRkX2Pj3yrq5yIiHWRkX2RkX2RkX1lZVKRkX2rq5yzs6GoqJdfX02goJKHh3SHh3VrpzVsAAAAMHRSTlMAQIDHx3+Ax0Ag7qBgIA9AEFCPMLOgMO7bYKBQ24+zYNuzkY9wcAXu0oiocPFBMHYlVbK0AAAD3UlEQVRYw6SW7Y6qMBCGB0IkLfKdnB9ocFmjru7HERL03P+VnXY6bdmWjcF9f2inxjydvjMDcHy99zP693oEpTpQYjBR7W4VmzA81GoZCDn/ycrValVmYOJcKBWL1/4HnUEpupLGxOI47iQmDkfc4GEBEFyNQkClzYDKQQs3VmJBufu6G7zRWNMeUzEHUnLVWs/gy9vg4NNB4wUIPOG2h7e8NcV0HRt7QPDxfzTd4ptleB5F6ro3NtsIc7UnjMKKXyuN30ZS+PuLRMW7PN+l2vlhAZ6yqCZmcrm05stfOrwVpvEBaJWStIOpVk/gC8Rb62tjRj25Fx/fEsgqE27cluKB8GR9hDFzeX44CFbmJb9/Cn8w1ldA5tO9VD/gc8FpveTbxfi1LXWOl10Z80c0Yx7/jpyyjRtd9zuxU8ZL8FEYJjZFpg6yIfOpKsf1FJ+EUkzddKkabQ+o0zCcwMN/vZm+uLh4UmW7nptTCBVq5nUF4Y0CgBaNVip18jsPn370909cfX708/gusF3fkQfrKZHXHh45Wi8meRefvfVCfwGOZ9zx8TZ9TjWY2M6vVf4jm8e3WYrDJ1Vj4N3FHwVd6vKFCxefBMFmq7ub6UI7TMZw0SEv8ryPDVaoxPiWufhL/02zY0cm3ZH1VgxIIYa1U/nIibH/EZjjp4M/9w/x9FijbyuqdzOVH+BbWQJxHMupd4pjINhDPKVH1lslBl9g6OKb73j0wmoBHrMj691nsJ0QLn4l0/09nrIm6wv7nGdQqwjGucvPJSWjN4z8aXyBlkfK+i2gmDI/HENGjXA9uPhsUJ22p2OQFg3daaFx0/9qnWBRbOl9hHlvOw3OW/xs4Hf4rcnYzj+OeFOIHj4dtG7/2y+b3IhBGAqjUiQWQ9JI/ErDpop6gcei9z9ZIXHIhLaLSGRW8zYxIuaTZccxqsGfHDXvH4cf37Z4e3ihxVOTp5bf4E8N2u+3PWB2SP7tXsfsFl80rtOeZX/gvz6//7tmnFFzD2mkxnFgL710ToHH1eCcm/LU2aA9m027v+kBH8ipyHbACxAMWaV5I4v2ZgAzIxkUGXIqkn3xrhw4wVe8hoMmOwBmYJMiJy+lHPriNcSyrvgEgUS2h/vl1BcvSqgcZsPbbABrhgdgvhgvS6hIYsPP8MwTVR5SLZA4573xHMpCV7xGZBFmxyProfR64yNCgKh4hygjXIuvpdcbPyEayA2vsEpRHcgl6gtzr8A9ho0RlgQnBPoK4tV45gBfGQZ6KQBDqzRcjdeAqQwHUfYp+SohcQdc1/Ukm4Gw4dV6vqTkM+uQpRv8E2VPF/sPp9xSb2qlGH4AAAAASUVORK5CYII=';

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

describe("@/components/molecules/TextEditor", () => {
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
