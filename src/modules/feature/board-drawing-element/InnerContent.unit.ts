import InnerContent from "./InnerContent.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { mount } from "@vue/test-utils";

describe("InnerContent", () => {
	const propsData = {
		isFirstElement: false,
		isLastElement: false,
		hasMultipleElements: false,
	};

	const setup = (options?: { isListBoard?: boolean; windowWidth?: number }) => {
		const { isListBoard, windowWidth } = {
			isListBoard: false,
			windowWidth: 1280,
			...options,
		};

		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: windowWidth,
		});

		const wrapper = mount(InnerContent, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[BOARD_IS_LIST_LAYOUT as symbol]: isListBoard,
				},
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

	it("should find the drawing-element language context", () => {
		const { wrapper } = setup();

		expect(wrapper.text()).toContain("components.cardElement.drawingElement");
	});

	describe("when board is a list board", () => {
		it.each`
			screenSize  | px
			${"small"}  | ${600}
			${"medium"} | ${960}
			${"large"}  | ${1280}
		`("content should have row style for $screenSize display sizes", ({ px: windowWidth }) => {
			const { wrapper } = setup({
				isListBoard: true,
				windowWidth,
			});

			expect(wrapper.find(".content-element-bar").classes()).toContain("flex-row");
		});

		it("content should have column style when display size is smaller than 600px", () => {
			const { wrapper } = setup({
				isListBoard: true,
				windowWidth: 599,
			});

			expect(wrapper.find(".content-element-bar").classes()).toContain("flex-column");
		});
	});

	describe("when board is not a list board", () => {
		it.each`
			screenSize  | px
			${"xs"}     | ${590}
			${"small"}  | ${600}
			${"medium"} | ${960}
			${"large"}  | ${1280}
		`("content should have column style for $screenSize display sizes", ({ px: windowWidth }) => {
			const { wrapper } = setup({
				isListBoard: false,
				windowWidth,
			});

			expect(wrapper.find(".content-element-bar").classes()).toContain("flex-column");
		});
	});
});
