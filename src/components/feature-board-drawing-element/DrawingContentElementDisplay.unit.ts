import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import DrawingContentElementEdit from "./DrawingContentElementEdit.vue";

describe("DrawingContentElementEdit", () => {
	const propsData = {
		lastUpdatedAt: "03.12 15:56",
		isFirstElement: false,
		isLastElement: false,
		hasMultipleElements: false,
	};

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(DrawingContentElementEdit, {
			...createComponentMocks({ i18n: true }),
			propsData,
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
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

	it("should display an icon", () => {
		const { wrapper } = setup();
		const drawingIcon = wrapper.find("v-icon-stub");
		expect(drawingIcon.exists()).toBe(true);
	});

	it("should find the drawing tag and display it", () => {
		const { wrapper } = setup();
		const drawingTag = wrapper
			.find("span.subtitle-1.text-truncate.black--text.text--darken-2")
			.text();
		const expectedText = wrapper.vm.$t("components.cardElement.drawingElement");
		expect(drawingTag).toContain(expectedText);
	});
});
