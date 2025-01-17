import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import KebabMenuAction from "./KebabMenuAction.vue";
import KebabMenuActionChangeLayout from "./KebabMenuActionChangeLayout.vue";

describe("BoardMenuActionChangeLayout", () => {
	const setup = () => {
		const wrapper = mount(KebabMenuActionChangeLayout, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should render", () => {
			const wrapper = setup();

			const action = wrapper.findComponent(KebabMenuAction);

			expect(action.exists()).toBe(true);
		});
	});
});
