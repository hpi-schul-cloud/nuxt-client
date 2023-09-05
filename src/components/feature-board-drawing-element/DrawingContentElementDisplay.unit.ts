import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import DrawingContentElementDisplay from "./DrawingContentElementDisplay.vue";

describe("DrawingContentElementDisplay", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			lastUpdatedAt: "03.12 15:56",
		};
		const wrapper = shallowMount(DrawingContentElementDisplay, {
			...createComponentMocks({ i18n: true }),
			propsData,
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
		});

		return {
			wrapper,
			lastUpdatedAt: propsData.lastUpdatedAt,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const component = wrapper.findComponent(DrawingContentElementDisplay);
		expect(component.exists()).toBe(true);
	});

	it("should display icon", async () => {
		const { wrapper } = setup();

		const drawingIcon = wrapper.find("v-icon-stub");

		expect(drawingIcon.exists()).toBe(true);
	});

	it("should find drawing tag", () => {
		const { wrapper } = setup();

		const drawingTag = wrapper
			.find("span.subtitle-1.text-truncate.black--text.text--darken-2")
			.text();

		expect(drawingTag).toContain(
			wrapper.vm.$t("components.cardElement.drawingElement")
		);
	});
});
