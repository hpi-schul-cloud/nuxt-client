import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, shallowMount } from "@vue/test-utils";
import AlternativeText from "./AlternativeText.vue";

describe("AlternativeText", () => {
	const mountSetup = () => {
		document.body.setAttribute("data-app", "true");

		const alternativeText = "test text";

		const wrapper = mount(AlternativeText, {
			propsData: { alternativeText },
			...createComponentMocks({}),
		});

		return {
			wrapper,
		};
	};

	const shallowMountSetup = () => {
		document.body.setAttribute("data-app", "true");

		const alternativeText = "test text";

		const wrapper = shallowMount(AlternativeText, {
			propsData: { alternativeText },
			...createComponentMocks({}),
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
		textarea.vm.$emit("input", newText);

		expect(wrapper.emitted("update:alternativeText")).toHaveLength(1);
		expect(wrapper.emitted("update:alternativeText")?.[0][0]).toBe(newText);
	});

	it("should pass text value to textarea", async () => {
		const { wrapper, alternativeText } = shallowMountSetup();

		const textarea = wrapper.find("v-textarea-stub");

		const hint = textarea.attributes("value");

		expect(hint).toBe(alternativeText);
	});

	it("should have a hint translation", async () => {
		const { wrapper } = shallowMountSetup();

		const textarea = wrapper.find("v-textarea-stub");

		const hint = textarea.attributes("hint");

		expect(hint).toBe(
			wrapper.vm.$i18n
				.t("components.cardElement.fileElement.altDescription")
				.toString()
		);
	});

	it("should have a label translation", async () => {
		const { wrapper } = shallowMountSetup();

		const textarea = wrapper.find("v-textarea-stub");

		const label = textarea.attributes("label");

		expect(label).toBe(
			wrapper.vm.$i18n
				.t("components.cardElement.fileElement.alternativeText")
				.toString()
		);
	});
});
