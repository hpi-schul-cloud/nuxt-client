import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { BoardMenuActionMoveDown } from "@ui-board";
import {
	BOARD_CARD_HAS_MULTIPLE_ELEMENTS,
	BOARD_CARD_IS_LAST_ELEMENT,
} from "@util-board";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardMenuAction from "./BoardMenuAction.vue";

describe("BoardMenuActionMoveDown Component", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options: {
		isLastElement: boolean;
		hasMultipleElements: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(BoardMenuActionMoveDown as MountOptions<Vue>, {
			...createComponentMocks({}),
			provide: {
				[BOARD_CARD_HAS_MULTIPLE_ELEMENTS as symbol]:
					options.hasMultipleElements,
				[BOARD_CARD_IS_LAST_ELEMENT as symbol]: options.isLastElement,
			},
		});
	};

	describe("when component is mounted", () => {
		it("should render if element not in last position and a list of elements exists", () => {
			setup({ isLastElement: false, hasMultipleElements: true });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeTruthy();
		});

		it("should not be rendered if element is in last position and a list of elements exists", () => {
			setup({ isLastElement: true, hasMultipleElements: true });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeFalsy();
		});

		it("should not be rendered if element is the only element", () => {
			setup({ isLastElement: true, hasMultipleElements: false });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeFalsy();
		});

		it("should emit if is clicked", () => {
			setup({ isLastElement: false, hasMultipleElements: true });
			const listItemComponent = wrapper.findComponent(BoardMenuAction);

			listItemComponent.vm.$emit("click", { preventDefault: jest.fn() });
			const emitted = wrapper.emitted("click");

			expect(emitted).toBeDefined();
		});
	});
});
