import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import RichTextContentElementEdit from "./RichTextContentElementEdit.vue";

describe("RichTextContentElementEdit", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: { value: string; autofocus: boolean }) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(RichTextContentElementEdit as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ value: "test value", autofocus: false });
			expect(wrapper.findComponent(RichTextContentElementEdit).exists()).toBe(
				true
			);
		});

		it("should pass props to textarea component", async () => {
			setup({ value: "test value", autofocus: true });

			const ckEditor = wrapper.findComponent({ name: "ck-editor" });

			expect(ckEditor.props("value")).toStrictEqual("test value");
		});
	});
});
