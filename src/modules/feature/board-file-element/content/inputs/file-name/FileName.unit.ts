import FileName from "./FileName.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { InputWrapperWithCheckmark } from "@ui-input";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { VTextField } from "vuetify/components";

describe("FileName", () => {
	const mountSetup = () => {
		const fileName = "myImage";
		const fileExtension = ".png";

		const wrapper = mount(FileName, {
			props: { name: fileName + fileExtension },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
			fileName,
			fileExtension,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = mountSetup();

		const fileName = wrapper.findComponent(FileName);

		expect(fileName.exists()).toBe(true);
	});

	it("should emit update:name on confirm", async () => {
		const { wrapper, fileExtension } = mountSetup();

		const inputWrapperWithCheckmark = wrapper.findComponent(InputWrapperWithCheckmark);
		const textField = wrapper.findComponent(VTextField);
		const newFileName = "myNewImage";
		await textField.setValue(newFileName);
		inputWrapperWithCheckmark.vm.$emit("confirm");

		expect(wrapper.emitted("update:name")).toHaveLength(1);
		expect(wrapper.emitted("update:name")?.[0][0]).toBe(newFileName + fileExtension);
	});

	it("should pass the name prop without extension to the text field", async () => {
		const { wrapper, fileName } = mountSetup();

		const textField = wrapper.findComponent(VTextField);
		await nextTick();
		const modelValue = textField.props("modelValue");

		expect(modelValue).toBe(fileName);
	});

	describe("when a value containing a < directly followed by a string is entered", () => {
		it("should not emit update:name", async () => {
			const { wrapper } = mountSetup();

			const inputWrapperWithCheckmark = wrapper.findComponent(InputWrapperWithCheckmark);
			const textField = wrapper.findComponent(VTextField);
			const newFileName = "my<NewImage";
			await textField.setValue(newFileName);
			inputWrapperWithCheckmark.vm.$emit("confirm");

			expect(wrapper.emitted("update:name")).toBeUndefined();
		});
	});

	describe("when an empty value is entered", () => {
		it("should not emit update:name", async () => {
			const { wrapper } = mountSetup();

			const inputWrapperWithCheckmark = wrapper.findComponent(InputWrapperWithCheckmark);
			const textField = wrapper.findComponent(VTextField);
			const newFileName = "";
			await textField.setValue(newFileName);
			inputWrapperWithCheckmark.vm.$emit("confirm");

			expect(wrapper.emitted("update:name")).toBeUndefined();
		});
	});
});
