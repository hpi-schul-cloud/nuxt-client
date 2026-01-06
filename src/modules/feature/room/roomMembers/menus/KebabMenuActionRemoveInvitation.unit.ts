import KebabMenuActionRemoveInvitation from "./KebabMenuActionRemoveInvitation.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("KebabMenuActionRemoveInvitation", () => {
	it("should render the component", async () => {
		const wrapper = mount(KebabMenuActionRemoveInvitation, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.text()).toBe("pages.rooms.members.registrations.actionMenu.remove");
	});
});
