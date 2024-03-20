import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardMenuActionMoveLeft } from "@ui-board";
import { BOARD_HAS_MULTIPLE_COLUMNS, BOARD_IS_FIRST_COLUMN } from "@util-board";
import { mount } from "@vue/test-utils";
import BoardMenuAction from "./BoardMenuAction.vue";

describe("BoardMenuActionMoveLeft Component", () => {
	const setup = (options: {
		isFirstColumn: boolean;
		hasMultipleColumns: boolean;
	}) => {
		const wrapper = mount(BoardMenuActionMoveLeft, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[BOARD_HAS_MULTIPLE_COLUMNS as symbol]: options.hasMultipleColumns,
					[BOARD_IS_FIRST_COLUMN as symbol]: options.isFirstColumn,
				},
			},
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should render if element not in first position and several columns exist", () => {
			const wrapper = setup({ isFirstColumn: false, hasMultipleColumns: true });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeTruthy();
		});

		it("should not be rendered if element is in first position and several columns exists", () => {
			const wrapper = setup({ isFirstColumn: true, hasMultipleColumns: true });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeFalsy();
		});

		it("should not be rendered if element is the only element", () => {
			const wrapper = setup({ isFirstColumn: true, hasMultipleColumns: false });
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBeFalsy();
		});

		it("should emit if is clicked", () => {
			const wrapper = setup({ isFirstColumn: false, hasMultipleColumns: true });
			const listItemComponent = wrapper.findComponent(BoardMenuAction);

			listItemComponent.vm.$emit("click", { preventDefault: jest.fn() });
			const emitted = wrapper.emitted("click");

			expect(emitted).toBeDefined();
		});
	});
});
