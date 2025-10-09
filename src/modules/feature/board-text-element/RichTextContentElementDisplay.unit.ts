import RichTextContentElementDisplay from "./RichTextContentElementDisplay.vue";
import { RenderHTML } from "@feature-render-html";
import { mount } from "@vue/test-utils";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";

describe("RichTextContentElementDisplay", () => {
	const setup = (options: { value: string }) => {
		const wrapper = mount(RichTextContentElementDisplay, {
			props: {
				...options,
			},
			global: {
				plugins: [vueDompurifyHTMLPlugin],
			},
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ value: "test value" });
			const content = wrapper.findComponent(RichTextContentElementDisplay);
			expect(content.exists()).toBe(true);
		});

		it("should pass props to ck-editor component", () => {
			const { wrapper } = setup({ value: "test value" });
			const editorComponent = wrapper.findComponent(RenderHTML);
			expect(editorComponent.text()).toStrictEqual("test value");
		});
	});
});
