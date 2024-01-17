import { shallowMount } from "@vue/test-utils";
import RichTextContentElementDisplay from "./RichTextContentElementDisplay.vue";
import { RenderHTML } from "@feature-render-html";

describe("RichTextContentElementDisplay", () => {
	const setup = (options: {}) => {
		const wrapper = shallowMount(RichTextContentElementDisplay, {
			props: {
				...options
			},
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const wrapper = setup({ value: "test value" });
			const content = wrapper.findComponent(RichTextContentElementDisplay);
			expect(content.exists()).toBe(true);
		});

		it("should pass props to ck-editor component", () => {
			const wrapper = setup({ value: "test value" });
			const editorComponent = wrapper.findComponent(RenderHTML);
			expect(editorComponent.vm.html).toStrictEqual("test value");
		});
	});
});
