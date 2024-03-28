import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount, shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import CaptionText from "./CaptionText.vue";

describe("CaptionText", () => {
	const mountSetup = () => {
		const caption = "test text";

		const wrapper = mount(CaptionText, {
			props: { text: caption },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
		};
	};

	const shallowMountSetup = () => {
		const caption = "test text";

		const wrapper = shallowMount(CaptionText, {
			props: { caption },
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return {
			wrapper,
			caption,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = shallowMountSetup();

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

	it("should pass caption value to textarea", () => {
		const { wrapper, caption } = shallowMountSetup();

		const textarea = wrapper.find("v-textarea-stub");
		const hint = textarea.attributes("modelvalue");

		expect(hint).toBe(caption);
	});

	it("should have a label translation", () => {
		const { wrapper } = shallowMountSetup();

		const textarea = wrapper.find("v-textarea-stub");

		const label = textarea.attributes("label");

		expect(label).toBe("components.cardElement.fileElement.caption");
	});
});
