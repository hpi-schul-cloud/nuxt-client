import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { BoardMenuActionMoveLeft } from "@ui-board";
import { BOARD_HAS_MULTIPLE_COLUMNS, BOARD_IS_FIRST_COLUMN } from "@util-board";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardMenuAction from "./BoardMenuAction.vue";

describe("BoardMenuActionMoveLeft Component", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options: {
		isFirstColumn: boolean;
		hasMultipleColumns: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(BoardMenuActionMoveLeft as MountOptions<Vue>, {
			...createComponentMocks({}),
			provide: {
				[BOARD_HAS_MULTIPLE_COLUMNS as symbol]: options.hasMultipleColumns,
				[BOARD_IS_FIRST_COLUMN as symbol]: options.isFirstColumn,
			},
		});
	};

	describe("when component is mounted", () => {
		it("should render if element not in first position and several columns exist", () => {
			setup({ isFirstColumn: false, hasMultipleColumns: true });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeTruthy();
		});

		it("should not be rendered if element is in first position and several columns exists", () => {
			setup({ isFirstColumn: true, hasMultipleColumns: true });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeFalsy();
		});

		it("should not be rendered if element is the only element", () => {
			setup({ isFirstColumn: true, hasMultipleColumns: false });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeFalsy();
		});

		it("should emit if is clicked", () => {
			setup({ isFirstColumn: false, hasMultipleColumns: true });
			const listItemComponent = wrapper.findComponent(BoardMenuAction);

			listItemComponent.vm.$emit("click", { preventDefault: jest.fn() });
			const emitted = wrapper.emitted("click");

			expect(emitted).toBeDefined();
		});
	});
});
