import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import KebabMenuActionRoomChangePermission from "./KebabMenuActionRoomChangePermission.vue";

describe("KebabMenuActionRoomChangePermission", () => {
	it("should render the component", async () => {
		const wrapper = mount(KebabMenuActionRoomChangePermission, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.text()).toBe("pages.rooms.members.changePermission");
	});
});
