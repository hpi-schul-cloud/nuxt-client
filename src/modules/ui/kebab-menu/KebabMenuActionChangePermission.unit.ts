import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import KebabMenuActionChangePermission from "./KebabMenuActionChangePermission.vue";

describe("KebabMenuActionChangePermission", () => {
	it("should render the component", async () => {
		const wrapper = mount(KebabMenuActionChangePermission, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.text()).toBe("pages.rooms.members.changePermission");
	});
});
