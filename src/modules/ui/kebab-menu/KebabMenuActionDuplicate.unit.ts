import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import KebabMenuActionDuplicate from "./KebabMenuActionDuplicate.vue";

describe("KebabMenuActionDuplicate", () => {
	it("should render component with correct text", async () => {
		const wrapper = mount(KebabMenuActionDuplicate, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.text()).toBe("common.actions.copyRoom");
	});
});
