import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";

import TextContentElementEdit from "./TextContentElementEdit.vue";

describe("TextContentElementEdit", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: { value: string; autofocus: boolean }) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(TextContentElementEdit as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ value: "test value", autofocus: false });
			expect(wrapper.findComponent(TextContentElementEdit).exists()).toBe(true);
		});

		it("should pass props to textarea component", async () => {
			setup({ value: "test value", autofocus: true });

			const textArea = wrapper.findComponent({ name: "VTextarea" });

			expect(textArea.props("value")).toStrictEqual("test value");
			expect(textArea.props("autofocus")).toStrictEqual(true);
		});
	});
});
