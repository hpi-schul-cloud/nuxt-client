import { fileElementResponseFactory } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import AlternativeText from "./AlternativeText.vue";

const alternativeText = "alt text";
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

	it("should have the modelValue as value", async () => {
		const { wrapper } = setup();

		const textfield = wrapper.find("v-text-field-stub");

		const valueAttribute = textfield.attributes("value");

		expect(valueAttribute).toBe(alternativeText);
	});

	it("should have a hint translation", async () => {
		const { wrapper } = setup();

		const textfield = wrapper.find("v-text-field-stub");

		const hint = textfield.attributes("hint");

		expect(hint).toBe(
			wrapper.vm.$i18n
				.t("components.cardElement.fileElement.altDescription")
				.toString()
		);
	});

	it("should have a label translation", async () => {
		const { wrapper } = setup();

		const textfield = wrapper.find("v-text-field-stub");

		const label = textfield.attributes("label");

		expect(label).toBe(
			wrapper.vm.$i18n
				.t("components.cardElement.fileElement.alternativeText")
				.toString()
		);
	});
});
