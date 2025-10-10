import AlternativeText from "./AlternativeText.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { InputWrapperWithCheckmark } from "@ui-input";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { VTextField } from "vuetify/components";

describe("AlternativeText", () => {
	const mountSetup = () => {
		const alternativeText: string | undefined = "test text";

		const wrapper = mount(AlternativeText, {
			props: { alternativeText, isEditMode: true },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
			alternativeText,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = mountSetup();

		const alternativeText = wrapper.findComponent(AlternativeText);

		expect(alternativeText.exists()).toBe(true);
	});

	it("should emit update:alternativeText on confirm", async () => {
		const { wrapper } = mountSetup();

		const inputWrapperWithCheckmark = wrapper.findComponent(InputWrapperWithCheckmark);
		const textField = wrapper.findComponent(VTextField);
		const newText = "new text";
		await textField.setValue(newText);
		inputWrapperWithCheckmark.vm.$emit("confirm");

		expect(wrapper.emitted("update:alternativeText")).toHaveLength(1);
		expect(wrapper.emitted("update:alternativeText")?.[0][0]).toBe(newText);
	});

	it("should pass the alternativeText prop to the text field", async () => {
		const { wrapper, alternativeText } = mountSetup();

		const textField = wrapper.findComponent(VTextField);
		await nextTick();
		const modelValue = textField.props("modelValue");

		expect(modelValue).toBe(alternativeText);
	});

	it("should have a hint translation", async () => {
		const { wrapper } = mountSetup();

		const textField = wrapper.findComponent(VTextField);
		const hint = textField.props("hint");

		expect(hint).toBe("components.cardElement.fileElement.altDescription");
	});

	it("should have a label translation", async () => {
		const { wrapper } = mountSetup();

		const textField = wrapper.findComponent(VTextField);
		const label = textField.props("label");

		expect(label).toBe("components.cardElement.fileElement.alternativeText");
	});

	describe("when a value containing a < directly followed by a string is entered", () => {
		it("should not emit update:alternativeText", async () => {
			const { wrapper } = mountSetup();

			const inputWrapperWithCheckmark = wrapper.findComponent(InputWrapperWithCheckmark);
			const textField = wrapper.findComponent(VTextField);
			const newText = "<abc123";
			await textField.setValue(newText);
			inputWrapperWithCheckmark.vm.$emit("confirm");

			expect(wrapper.emitted("update:alternativeText")).toBeUndefined();
		});
	});
});
