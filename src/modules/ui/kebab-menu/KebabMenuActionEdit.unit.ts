import KebabMenuAction from "./KebabMenuAction.vue";
import KebabMenuActionEdit from "./KebabMenuActionEdit.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("KebabMenuActionEdit Component", () => {
	const setup = (props = {}) =>
		mount(KebabMenuActionEdit, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

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
