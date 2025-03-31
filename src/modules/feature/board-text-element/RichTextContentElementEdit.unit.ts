import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import RichTextContentElementEdit from "./RichTextContentElementEdit.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe("RichTextContentElementEdit", () => {
	const setup = (props: { value: string; autofocus: boolean }) => {
		const wrapper = mount(RichTextContentElementEdit, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ value: "test value", autofocus: false });
			const content = wrapper.findComponent(RichTextContentElementEdit);
			expect(content.exists()).toBe(true);
		});

		it("should pass props to ck-editor component", async () => {
			const { wrapper } = setup({ value: "test value", autofocus: true });
			const ckEditorComponent = wrapper.findComponent({ name: "InlineEditor" });
			await nextTick();
			const ckEditorValue = ckEditorComponent.findComponent({
				name: "ckeditor",
			}).vm.modelValue;
			expect(ckEditorValue).toStrictEqual("test value");
		});

		it("should emit delete:element on CK editor keyboard delete event", async () => {
			const { wrapper } = setup({ value: "test value", autofocus: true });
			const ckEditor = wrapper.findComponent({ name: "InlineEditor" });
			ckEditor.vm.$emit("keyboard:delete");

			const emitted = wrapper.emitted();
			expect(emitted["delete:element"]).toHaveLength(1);
		});

		it("should update modalValue when prop value changes", async () => {
			const { wrapper } = setup({ value: "test value", autofocus: true });
			const newValue = "new title";
			await wrapper.setProps({ value: newValue });
			await nextTick();

			const emitted = wrapper.emitted();
			expect(emitted["update:value"]).toHaveLength(1);
		});
	});
});
