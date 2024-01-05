import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import InnerContent from "./InnerContent.vue";

describe("InnerContent", () => {
	const propsData = {
		lastUpdatedAt: "2023-12-15 17:30:00",
		isFirstElement: false,
		isLastElement: false,
		hasMultipleElements: false,
	};

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(InnerContent as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			propsData,
			provide: {
				[I18N_KEY.valueOf()]: { tc: (key: string) => key },
			},
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
		const imageElement = wrapper.find("v-img-stub");
		expect(imageElement.exists()).toBe(true);
	});

	it("should find the drawing-element language context", () => {
		const { wrapper } = setup();

		expect(wrapper.text()).toContain("Whiteboard");
	});
});
