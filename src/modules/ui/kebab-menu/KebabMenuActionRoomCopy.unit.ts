import KebabMenuActionRoomCopy from "./KebabMenuActionRoomCopy.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";

describe("KebabMenuActionRoomCopy", () => {
	it("should render component with correct text", async () => {
		const wrapper = mount(KebabMenuActionRoomCopy, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.text()).toBe("common.actions.duplicate");
	});
});
