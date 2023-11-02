import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, shallowMount } from "@vue/test-utils";
import CaptionText from "./CaptionText.vue";

describe("CaptionText", () => {
	const mountSetup = () => {
		document.body.setAttribute("data-app", "true");

		const caption = "test text";

		const wrapper = mount(CaptionText, {
			propsData: { text: caption },
			...createComponentMocks({}),
		});

		return {
			wrapper,
		};
	};

	const shallowMountSetup = () => {
		document.body.setAttribute("data-app", "true");

		const caption = "test text";

		const wrapper = shallowMount(CaptionText, {
			propsData: { caption },
			...createComponentMocks({}),
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
		textarea.vm.$emit("input", newText);

		expect(wrapper.emitted("update:caption")).toHaveLength(1);
		expect(wrapper.emitted("update:caption")?.[0][0]).toBe(newText);
	});

	it("should pass caption value to textarea", async () => {
		const { wrapper, caption } = shallowMountSetup();

		const textarea = wrapper.find("v-textarea-stub");

		const hint = textarea.attributes("value");

		expect(hint).toBe(caption);
	});

	it("should have a label translation", async () => {
		const { wrapper } = shallowMountSetup();

		const textarea = wrapper.find("v-textarea-stub");

		const label = textarea.attributes("label");

		expect(label).toBe(
			wrapper.vm.$i18n
				.t("components.cardElement.fileElement.caption")
				.toString()
		);
	});
});
