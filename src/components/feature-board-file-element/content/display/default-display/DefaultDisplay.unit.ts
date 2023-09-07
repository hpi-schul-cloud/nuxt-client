import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mdiFileDocumentOutline } from "@mdi/js";
import { shallowMount } from "@vue/test-utils";
import DefaultDisplay from "./DefaultDisplay.vue";

describe("DefaultDisplay", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = { name: "test-name" };
		const wrapper = shallowMount(DefaultDisplay, {
			propsData,
			...createComponentMocks({}),
		});

		return {
			wrapper,
			name: propsData.name,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const defaultDisplay = wrapper.findComponent(DefaultDisplay);

		expect(defaultDisplay.exists()).toBe(true);
	});

	it("should render name prop", () => {
		const { wrapper, name } = setup();

		const text = wrapper.text();

		expect(text).toContain(name);
	});

	it("should render icon", () => {
		const { wrapper } = setup();

		const icon = wrapper.find("v-icon-stub").text();

		expect(icon).toBe(mdiFileDocumentOutline);
	});
});
