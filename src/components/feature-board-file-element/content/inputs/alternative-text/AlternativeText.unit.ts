import { fileElementResponseFactory } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import AlternativeText from "./AlternativeText.vue";

const alternativeText = "text";
jest.mock("@data-board", () => {
	return {
		useContentElementState: jest.fn(() => ({
			modelValue: { alternativeText },
		})),
	};
});

describe("AlternativeText", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = { element: fileElementResponseFactory.build() };

		const wrapper = shallowMount(AlternativeText, {
			propsData,
			...createComponentMocks({}),
		});

		return {
			wrapper,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(AlternativeText);

		expect(fileContentElement.exists()).toBe(true);
	});

	it("should emit if text changes", async () => {
		const { wrapper } = setup();

		const textarea = wrapper.find("v-textarea-stub");
		const newText = "new text";
		textarea.vm.$emit("input", "new text");
		const emitted = wrapper.emitted();

		if (emitted["update:text"] === undefined) {
			throw new Error("Emitted should be defined");
		}

		expect(emitted["update:text"][0][0]).toContain(newText);
	});

	it("should have a hint translation", async () => {
		const { wrapper } = setup();

		const textarea = wrapper.find("v-textarea-stub");

		const hint = textarea.attributes("hint");

		expect(hint).toBe(
			wrapper.vm.$i18n
				.t("components.cardElement.fileElement.altDescription")
				.toString()
		);
	});

	it("should have a label translation", async () => {
		const { wrapper } = setup();

		const textarea = wrapper.find("v-textarea-stub");

		const label = textarea.attributes("label");

		expect(label).toBe(
			wrapper.vm.$i18n
				.t("components.cardElement.fileElement.alternativeText")
				.toString()
		);
	});
});
