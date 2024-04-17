import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardMenuActionMoveColumnDown } from "@ui-board";
import { BOARD_HAS_MULTIPLE_COLUMNS, BOARD_IS_LAST_COLUMN } from "@util-board";
import { shallowMount } from "@vue/test-utils";
import BoardMenuAction from "./BoardMenuAction.vue";

describe("BoardMenuActionMoveColumnDown Component", () => {
	const setup = (options: {
		isLastColumn: boolean;
		hasMultipleColumns: boolean;
	}) => {
		const wrapper = shallowMount(BoardMenuActionMoveColumnDown, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[BOARD_HAS_MULTIPLE_COLUMNS as symbol]: options.hasMultipleColumns,
					[BOARD_IS_LAST_COLUMN as symbol]: options.isLastColumn,
				},
			},
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should render if element not in last position and several columns exist", () => {
			const wrapper = setup({ isLastColumn: false, hasMultipleColumns: true });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeTruthy();
		});

		it("should not be rendered if element is in last position and several columns exists", () => {
			const wrapper = setup({ isLastColumn: true, hasMultipleColumns: true });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeFalsy();
		});

		it("should not be rendered if element is the only column", () => {
			const wrapper = setup({ isLastColumn: true, hasMultipleColumns: false });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeFalsy();
		});

		it("should emit if is clicked", () => {
			const wrapper = setup({ isLastColumn: false, hasMultipleColumns: true });
			const listItemComponent = wrapper.findComponent(BoardMenuAction);

			listItemComponent.vm.$emit("click", { preventDefault: jest.fn() });
			const emitted = wrapper.emitted("click");

			expect(emitted).toBeDefined();
		});
	});
});
