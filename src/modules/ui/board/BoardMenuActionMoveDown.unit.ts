import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardMenuActionMoveDown } from "@ui-board";
import {
	BOARD_CARD_HAS_MULTIPLE_ELEMENTS,
	BOARD_CARD_IS_LAST_ELEMENT,
} from "@util-board";
import { mount } from "@vue/test-utils";
import BoardMenuAction from "./BoardMenuAction.vue";

describe("BoardMenuActionMoveDown Component", () => {
	const setup = (options: {
		isLastElement: boolean;
		hasMultipleElements: boolean;
	}) => {
		const wrapper = mount(BoardMenuActionMoveDown, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[BOARD_CARD_HAS_MULTIPLE_ELEMENTS as symbol]:
						options.hasMultipleElements,
					[BOARD_CARD_IS_LAST_ELEMENT as symbol]: options.isLastElement,
				},
			},
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should render if element not in last position and a list of elements exists", () => {
			const wrapper = setup({
				isLastElement: false,
				hasMultipleElements: true,
			});
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBe(true);
		});

		it("should not be rendered if element is in last position and a list of elements exists", () => {
			const wrapper = setup({ isLastElement: true, hasMultipleElements: true });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBe(false);
		});

		it("should not be rendered if element is the only element", () => {
			const wrapper = setup({
				isLastElement: true,
				hasMultipleElements: false,
			});
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBe(false);
		});

		it("should emit if is clicked", () => {
			const wrapper = setup({
				isLastElement: false,
				hasMultipleElements: true,
			});
			const listItemComponent = wrapper.findComponent(BoardMenuAction);

			listItemComponent.vm.$emit("click", { preventDefault: vi.fn() });
			const emitted = wrapper.emitted("click");

			expect(emitted).toBeDefined();
		});
	});
});
