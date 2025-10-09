import KebabMenuActionLeaveRoom from "./KebabMenuActionLeaveRoom.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("KebabMenuActionLeaveRoom", () => {
	it("should render the component", async () => {
		const wrapper = mount(KebabMenuActionLeaveRoom, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.text()).toBe("pages.rooms.leaveRoom.menu");
	});
});
