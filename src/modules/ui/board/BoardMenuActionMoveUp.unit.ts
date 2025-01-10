import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardMenuActionMoveUp } from "@ui-board";
import { shallowMount } from "@vue/test-utils";
import BoardMenuAction from "./BoardMenuAction.vue";

describe("BoardMenuActionMoveUp Component", () => {
	const setup = () => {
		const wrapper = shallowMount(BoardMenuActionMoveUp, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should render if element not in first position and a list of elements exists", () => {
			const wrapper = setup();
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBe(true);
		});

		it("should emit if is clicked", () => {
			const wrapper = setup();
			const listItemComponent = wrapper.findComponent(BoardMenuAction);

			listItemComponent.vm.$emit("click", { preventDefault: jest.fn() });
			const emitted = wrapper.emitted("click");

			expect(emitted).toBeDefined();
		});
	});
});
