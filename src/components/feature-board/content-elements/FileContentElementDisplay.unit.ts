import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";

describe("FileContentElementDisplay", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const captionProp = "Test Caption";

		const wrapper = shallowMount(FileContentElementDisplay, {
			...createComponentMocks({ i18n: true }),
			propsData: { caption: captionProp },
		});

		return { wrapper, captionProp };
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(FileContentElementDisplay);
		expect(fileContentElement.exists()).toBe(true);
	});

	it("should find caption", () => {
		const { wrapper, captionProp } = setup();

		const caption = wrapper.text();
		expect(caption).toBe(captionProp);
	});
});
