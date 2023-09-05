import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import DrawingContentElementEdit from "./DrawingContentElementEdit.vue";
import DrawingContentElementMenu from "./DrawingContentElementMenu.vue";

describe("DrawingContentElementEdit", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			lastUpdatedAt: "03.12 15:56",
			isFirstElement: false,
			isLastElement: false,
			hasMultipleElements: false,
		};
		const wrapper = shallowMount(DrawingContentElementEdit, {
			...createComponentMocks({ i18n: true }),
			propsData,
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
		});

		return {
			wrapper,
			lastUpdatedAt: propsData.lastUpdatedAt,
			isFirstElementProp: propsData.isFirstElement,
			isLastElementProp: propsData.isLastElement,
			hasMultipleElementsProp: propsData.hasMultipleElements,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const drawingContentElement = wrapper.findComponent(
			DrawingContentElementEdit
		);
		expect(drawingContentElement.exists()).toBe(true);
	});

	it("should display icon", async () => {
		const { wrapper } = setup();

		const drawingIcon = wrapper.find("v-icon-stub");

		expect(drawingIcon.exists()).toBe(true);
	});

	it("should render the DrawingContentElementMenu", () => {
		const { wrapper } = setup();

		const menu = wrapper.findComponent(DrawingContentElementMenu);

		expect(menu.exists()).toBe(true);
	});

	it("should hand over isFirstElement prop correctly to DrawingContentElementMenu", () => {
		const { wrapper, isFirstElementProp } = setup();

		const isFirstElement = wrapper
			.findComponent(DrawingContentElementMenu)
			.props("isFirstElement");

		expect(isFirstElement).toBe(isFirstElementProp);
	});

	it("should hand over isLastElement prop correctly to DrawingContentElementMenu", () => {
		const { wrapper, isLastElementProp } = setup();

		const isLastElement = wrapper
			.findComponent(DrawingContentElementMenu)
			.props("isLastElement");

		expect(isLastElement).toBe(isLastElementProp);
	});

	it("should hand over hasMultipleElements prop correctly to DrawingContentElementMenu", () => {
		const { wrapper, hasMultipleElementsProp } = setup();

		const hasMultipleElements = wrapper
			.findComponent(DrawingContentElementMenu)
			.props("hasMultipleElements");

		expect(hasMultipleElements).toBe(hasMultipleElementsProp);
	});

	it("should forward delete:element from DrawingContentElementMenu", () => {
		const { wrapper } = setup();
		const menu = wrapper.findComponent(DrawingContentElementMenu);

		menu.vm.$emit("delete:element");

		expect(wrapper.emitted("delete:element")).toHaveLength(1);
	});

	it("should forward move-down:element from DrawingContentElementMenu", () => {
		const { wrapper } = setup();
		const menu = wrapper.findComponent(DrawingContentElementMenu);

		menu.vm.$emit("move-down:element");

		expect(wrapper.emitted("move-down:element")).toHaveLength(1);
	});

	it("should forward move-down:up from DrawingContentElementMenu", () => {
		const { wrapper } = setup();
		const menu = wrapper.findComponent(DrawingContentElementMenu);

		menu.vm.$emit("move-up:element");

		expect(wrapper.emitted("move-up:element")).toHaveLength(1);
	});
});
