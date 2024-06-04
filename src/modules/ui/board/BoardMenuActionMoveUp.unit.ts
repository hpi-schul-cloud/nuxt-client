import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardMenuActionMoveUp } from "@ui-board";
import {
	BOARD_CARD_HAS_MULTIPLE_ELEMENTS,
	BOARD_CARD_IS_FIRST_ELEMENT,
} from "@util-board";
import { shallowMount } from "@vue/test-utils";
import BoardMenuAction from "./BoardMenuAction.vue";

describe("BoardMenuActionMoveUp Component", () => {
	const setup = (options: {
		isFirstElement: boolean;
		hasMultipleElements: boolean;
	}) => {
		const wrapper = shallowMount(BoardMenuActionMoveUp, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[BOARD_CARD_HAS_MULTIPLE_ELEMENTS as symbol]:
						options.hasMultipleElements,
					[BOARD_CARD_IS_FIRST_ELEMENT as symbol]: options.isFirstElement,
				},
			},
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should render if element not in first position and a list of elements exists", () => {
			const wrapper = setup({
				isFirstElement: false,
				hasMultipleElements: true,
			});
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBe(true);
		});

		it("should not be rendered if element is in first position and a list of elements exists", () => {
			const wrapper = setup({
				isFirstElement: true,
				hasMultipleElements: true,
			});
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBe(false);
		});
		it("should not be rendered if element is the only element", () => {
			const wrapper = setup({
				isFirstElement: true,
				hasMultipleElements: false,
			});
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBe(false);
		});

		it("should emit if is clicked", () => {
			const wrapper = setup({
				isFirstElement: false,
				hasMultipleElements: true,
			});
			const listItemComponent = wrapper.findComponent(BoardMenuAction);

			listItemComponent.vm.$emit("click", { preventDefault: jest.fn() });
			const emitted = wrapper.emitted("click");

			expect(emitted).toBeDefined();
		});
	});
});
