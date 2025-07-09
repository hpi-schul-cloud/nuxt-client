import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount, shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import AlternativeText from "./AlternativeText.vue";

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

	const shallowMountSetup = () => {
		const alternativeText = "test text";

		const wrapper = shallowMount(AlternativeText, {
			props: { alternativeText, isEditMode: true },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
			alternativeText,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = shallowMountSetup();

		const fileContentElement = wrapper.findComponent(AlternativeText);

		expect(fileContentElement.exists()).toBe(true);
	});

	it("should emit update:alternativeText if text changes", async () => {
		const { wrapper } = mountSetup();

		const textarea = wrapper.findComponent({ name: "v-textarea" });
		const newText = "new text";
		await textarea.setValue(newText);
		await nextTick();

		expect(wrapper.emitted("update:alternativeText")).toHaveLength(1);
		expect(wrapper.emitted("update:alternativeText")?.[0][0]).toBe(newText);
	});

	it("should have a hint translation", async () => {
		const { wrapper } = shallowMountSetup();

		const textarea = wrapper.find("v-textarea-stub");

		const hint = textarea.attributes("hint");

		expect(hint).toBe("components.cardElement.fileElement.altDescription");
	});

	it("should have a label translation", async () => {
		const { wrapper } = shallowMountSetup();

		const textarea = wrapper.find("v-textarea-stub");

		const label = textarea.attributes("label");

		expect(label).toBe("components.cardElement.fileElement.alternativeText");
	});
});
