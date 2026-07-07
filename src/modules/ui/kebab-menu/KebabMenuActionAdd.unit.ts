import KebabMenuActionAdd from "./KebabMenuActionAdd.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("KebabMenuActionAdd", () => {
	it("should render the component", async () => {
		const wrapper = mount(KebabMenuActionAdd, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.text()).toBe("common.actions.add");
	});
});
