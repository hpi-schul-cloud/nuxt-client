import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import InnerContent from "./InnerContent.vue";

describe("InnerContent", () => {
	const propsData = {
		isFirstElement: false,
		isLastElement: false,
		hasMultipleElements: false,
	};

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = mount(InnerContent, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData,
		});

		return {
			wrapper,
			...propsData,
		};
	};

	it("should be found in the DOM", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should display the image", () => {
		const { wrapper } = setup();
		const imageElement = wrapper.findComponent({ name: "v-img" });

		expect(imageElement.exists()).toBe(true);
	});

	it("should find the text editor title", () => {
		const { wrapper } = setup();

		expect(wrapper.text()).toContain(
			"components.cardElement.collaborativeTextEditorElement"
		);
	});
});
