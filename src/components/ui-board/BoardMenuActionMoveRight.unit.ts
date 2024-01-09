import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { BoardMenuActionMoveRight } from "@ui-board";
import { BOARD_HAS_MULTIPLE_COLUMNS, BOARD_IS_LAST_COLUMN } from "@util-board";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardMenuAction from "./BoardMenuAction.vue";

describe("BoardMenuActionMoveLeft Component", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options: {
		isLastColumn: boolean;
		hasMultipleColumns: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(BoardMenuActionMoveRight as MountOptions<Vue>, {
			...createComponentMocks({}),
			provide: {
				[BOARD_HAS_MULTIPLE_COLUMNS as symbol]: options.hasMultipleColumns,
				[BOARD_IS_LAST_COLUMN as symbol]: options.isLastColumn,
			},
		});
	};

	describe("when component is mounted", () => {
		it("should render if element not in last position and several columns exist", () => {
			setup({ isLastColumn: false, hasMultipleColumns: true });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeTruthy();
		});

		it("should not be rendered if element is in last position and several columns exists", () => {
			setup({ isLastColumn: true, hasMultipleColumns: true });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeFalsy();
		});

		it("should not be rendered if element is the only element", () => {
			setup({ isLastColumn: true, hasMultipleColumns: false });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeFalsy();
		});

		it("should emit if is clicked", () => {
			setup({ isLastColumn: false, hasMultipleColumns: true });
			const listItemComponent = wrapper.findComponent(BoardMenuAction);

			listItemComponent.vm.$emit("click", { preventDefault: jest.fn() });
			const emitted = wrapper.emitted("click");

			expect(emitted).toBeDefined();
		});
	});
});
