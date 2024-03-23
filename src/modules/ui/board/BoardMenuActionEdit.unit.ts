import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardMenuActionEdit } from "@ui-board";
import { mount } from "@vue/test-utils";
import BoardMenuAction from "./BoardMenuAction.vue";

describe("BoardMenuActionEdit Component", () => {
	const setup = () => {
		const wrapper = mount(BoardMenuActionEdit, {
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
			expect(action.exists()).toBeTruthy();
		});
	});
});
