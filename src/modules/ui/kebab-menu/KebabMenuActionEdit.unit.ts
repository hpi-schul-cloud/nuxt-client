import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import KebabMenuActionEdit from "./KebabMenuActionEdit.vue";
import KebabMenuAction from "./KebabMenuAction.vue";

describe("KebabMenuActionEdit Component", () => {
	const setup = (props = {}) => {
		return mount(KebabMenuActionEdit, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});
	};

	describe("when component is mounted", () => {
		it("should render", () => {
			const wrapper = setup();
			const action = wrapper.findComponent(KebabMenuAction);
			expect(action.exists()).toBe(true);
		});
	});

	describe("when no text prop is provided", () => {
		it("should display the default text from i18n", () => {
			const wrapper = setup();
			expect(wrapper.text()).toContain("common.actions.edit");
		});
	});
});
