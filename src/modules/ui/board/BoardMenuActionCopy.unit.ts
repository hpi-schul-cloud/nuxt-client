import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardMenuActionCopy } from "@ui-board";
import { mount } from "@vue/test-utils";
import BoardMenuAction from "./BoardMenuAction.vue";

describe("BoardMenuActionCopy Component", () => {
	const setup = () => {
		const wrapper = mount(BoardMenuActionCopy, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should render", () => {
			const wrapper = setup();
			const action = wrapper.findComponent(BoardMenuAction);
			expect(action.exists()).toBe(true);
		});
	});
});
