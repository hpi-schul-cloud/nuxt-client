import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import RichTextContentElementDisplay from "./RichTextContentElementDisplay.vue";

describe("RichTextContentElementDisplay", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: { value?: string }) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(RichTextContentElementDisplay as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ value: "test value" });
			expect(
				wrapper.findComponent(RichTextContentElementDisplay).exists()
			).toBe(true);
		});

		it("should pass props to ck-editor component", () => {
			setup({ value: "test value" });
			expect(wrapper.text()).toStrictEqual("test value");
		});
	});
});
