import KebabMenuActionResendInvitation from "./KebabMenuActionResendInvitation.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("KebabMenuActionResendInvitation", () => {
	it("should render the component", async () => {
		const wrapper = mount(KebabMenuActionResendInvitation, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.text()).toBe("pages.rooms.members.registrations.actionMenu.resend");
	});
});
