import CaptionText from "./CaptionText.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

describe("CaptionText", () => {
	const mountSetup = () => {
		const caption = "test text";

		const wrapper = mount(CaptionText, {
			props: { text: caption, isEditMode: true },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
			caption,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = mountSetup();

		const fileContentElement = wrapper.findComponent(CaptionText);

		expect(fileContentElement.exists()).toBe(true);
	});

	it("should emit if text changes", async () => {
		const { wrapper } = mountSetup();

		const textarea = wrapper.findComponent({ name: "v-textarea" });
		const newText = "new text";
		await textarea.setValue(newText);
		await nextTick();

		expect(wrapper.emitted("update:caption")).toHaveLength(1);
		expect(wrapper.emitted("update:caption")?.[0][0]).toBe(newText);
	});

	it("should have a label translation", () => {
		const { wrapper } = mountSetup();

		const textarea = wrapper.findComponent({ name: "v-textarea" });

		const label = textarea.find("label");

		expect(label.text()).toContain("components.cardElement.fileElement.caption");
	});
});
