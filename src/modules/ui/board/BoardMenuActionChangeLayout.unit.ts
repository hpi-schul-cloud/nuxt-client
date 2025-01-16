import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import BoardMenuAction from "./BoardMenuAction.vue";
import BoardMenuActionChangeLayout from "./BoardMenuActionChangeLayout.vue";

describe("BoardMenuActionChangeLayout", () => {
	const setup = () => {
		const wrapper = mount(BoardMenuActionChangeLayout, {
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
