import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import KebabMenuAction from "./KebabMenuAction.vue";
import KebabMenuActionRename from "./KebabMenuActionRename.vue";

describe("KebabMenuActionRename", () => {
	const setup = () => {
		const wrapper = mount(KebabMenuActionRename, {
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

		it("should contain translation key", () => {
			const wrapper = setup();
			expect(wrapper.text()).toContain("common.actions.rename");
		});
	});
});
