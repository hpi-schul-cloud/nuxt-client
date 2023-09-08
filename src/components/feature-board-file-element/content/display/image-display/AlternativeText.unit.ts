import { fileElementResponseFactory } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import AlternativeText from "./AlternativeText.vue";

jest.mock("@data-board", () => {
	return {
		useContentElementState: jest.fn(() => ({
			modelValue: { alternativeText: "alt text" },
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
});
