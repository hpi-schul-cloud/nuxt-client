import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardMenuActionMoveColumnUp } from "@ui-board";
import { BOARD_HAS_MULTIPLE_COLUMNS, BOARD_IS_FIRST_COLUMN } from "@util-board";
import { shallowMount } from "@vue/test-utils";
import BoardMenuAction from "./BoardMenuAction.vue";

describe("BoardMenuActionMoveColumnUp Component", () => {
	const setup = (options: {
		isFirstColumn: boolean;
		hasMultipleColumns: boolean;
	}) => {
		const wrapper = shallowMount(BoardMenuActionMoveColumnUp, {
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
		it("should render if element not in first position and a list of columns exists", () => {
			const wrapper = setup({
				isFirstColumn: false,
				hasMultipleColumns: true,
			});
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBe(true);
		});

		it("should not be rendered if element is in first position and a list of columns exists", () => {
			const wrapper = setup({
				isFirstColumn: true,
				hasMultipleColumns: true,
			});
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBe(false);
		});
		it("should not be rendered if element is the only column", () => {
			const wrapper = setup({
				isFirstColumn: true,
				hasMultipleColumns: false,
			});
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBe(false);
		});

		it("should emit if is clicked", () => {
			const wrapper = setup({
				isFirstColumn: false,
				hasMultipleColumns: true,
			});
			const listItemComponent = wrapper.findComponent(BoardMenuAction);

			listItemComponent.vm.$emit("click", { preventDefault: vi.fn() });
			const emitted = wrapper.emitted("click");

			expect(emitted).toBeDefined();
		});
	});
});
