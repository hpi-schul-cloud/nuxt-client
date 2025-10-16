import CaptionText from "./CaptionText.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { VTextarea } from "vuetify/components";

describe("CaptionText", () => {
	const mountSetup = () => {
		const caption = "test text";

		const wrapper = mount(CaptionText, {
			props: { caption: caption },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
			caption,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = mountSetup();

		const captionText = wrapper.findComponent(CaptionText);

		expect(captionText.exists()).toBe(true);
	});

	it("should emit update:caption on caption change", async () => {
		const { wrapper } = mountSetup();

		const textArea = wrapper.findComponent(VTextarea);
		const newText = "new text";
		await textArea.setValue(newText);
		await nextTick();

		expect(wrapper.emitted("update:caption")).toHaveLength(1);
		expect(wrapper.emitted("update:caption")?.[0][0]).toBe(newText);
	});

	it("should pass the caption prop to the text area", async () => {
		const { wrapper, caption } = mountSetup();

		const textArea = wrapper.findComponent(VTextarea);
		await nextTick();
		const modelValue = textArea.props("modelValue");

		expect(modelValue).toBe(caption);
	});

	it("should have a label translation", () => {
		const { wrapper } = mountSetup();

		const textArea = wrapper.findComponent(VTextarea);
		const label = textArea.props("label");

		expect(label).toBe("components.cardElement.fileElement.caption");
	});

	describe("when a value containing a < directly followed by a string is entered", () => {
		it("should not emit update:caption", async () => {
			const { wrapper } = mountSetup();

			const textArea = wrapper.findComponent(VTextarea);
			const newText = "<abc123";
			await textArea.setValue(newText);
			await nextTick();

			expect(wrapper.emitted("update:caption")).toBeUndefined();
		});
	});

	describe("DOM events", () => {
		it("should stop click event propagation", async () => {
			const { wrapper } = mountSetup();
			const textArea = wrapper.findComponent(VTextarea);

			const parent = document.createElement("div");
			document.body.appendChild(parent);
			parent.appendChild(wrapper.element);

			let bubbled = false;
			parent.addEventListener("click", () => {
				bubbled = true;
			});

			await textArea.trigger("click");

			expect(bubbled).toBe(false);
		});

		it("should stop keydown enter event propagation", async () => {
			const { wrapper } = mountSetup();
			const textArea = wrapper.findComponent(VTextarea);

			const parent = document.createElement("div");
			document.body.appendChild(parent);
			parent.appendChild(wrapper.element);

			let bubbled = false;
			parent.addEventListener("keydown", (e) => {
				if (e.key === "Enter") {
					bubbled = true;
				}
			});

			await textArea.trigger("keydown", { key: "Enter" });
			expect(bubbled).toBe(false);
		});
	});
});
