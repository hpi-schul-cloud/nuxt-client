import KebabMenuActionExport from "./KebabMenuActionExport.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("KebabMenuActionExport", () => {
	it("should render the component", async () => {
		const wrapper = mount(KebabMenuActionExport, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.exists()).toBe(true);
	});
});
