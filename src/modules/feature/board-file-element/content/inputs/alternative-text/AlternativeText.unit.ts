import AlternativeText from "./AlternativeText.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { VTextarea } from "vuetify/components";

describe("AlternativeText", () => {
	const mountSetup = () => {
		const alternativeText: string | undefined = "test text";

		const wrapper = mount(AlternativeText, {
			props: { alternativeText, isEditMode: true },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = mountSetup();

		const fileContentElement = wrapper.findComponent(AlternativeText);

		expect(fileContentElement.exists()).toBe(true);
	});

	it("should emit update:alternativeText if text changes", async () => {
		const { wrapper } = mountSetup();

		const textarea = wrapper.findComponent(VTextarea);
		const newText = "new text";
		await textarea.setValue(newText);
		await nextTick();

		expect(wrapper.emitted("update:alternativeText")).toHaveLength(1);
		expect(wrapper.emitted("update:alternativeText")?.[0][0]).toBe(newText);
	});

	it("should have a hint translation", async () => {
		const { wrapper } = mountSetup();

		const textarea = wrapper.findComponent(VTextarea);

		const hint = textarea.props("hint");

		expect(hint).toBe("components.cardElement.fileElement.altDescription");
	});

	it("should have a label translation", async () => {
		const { wrapper } = mountSetup();

		const textarea = wrapper.findComponent(VTextarea);

		const label = textarea.props("label");

		expect(label).toBe("components.cardElement.fileElement.alternativeText");
	});
});
