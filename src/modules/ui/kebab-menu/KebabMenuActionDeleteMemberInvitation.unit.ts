import KebabMenuActionDeleteMemberInvitation from "./KebabMenuActionDeleteMemberInvitation.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("KebabMenuActionRemoveMember", () => {
	it("should render the component", async () => {
		const wrapper = mount(KebabMenuActionDeleteMemberInvitation, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.text()).toBe("common.actions.delete");
	});
});
