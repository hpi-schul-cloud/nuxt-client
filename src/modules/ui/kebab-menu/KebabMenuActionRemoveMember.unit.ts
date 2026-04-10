import KebabMenuActionRemoveMember from "./KebabMenuActionRemoveMember.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("KebabMenuActionRemoveMember", () => {
	it("should render the component", async () => {
		const wrapper = mount(KebabMenuActionRemoveMember, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.text()).toBe("common.actions.remove");
	});
});
