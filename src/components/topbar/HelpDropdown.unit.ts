import { mount } from "@vue/test-utils";
import HelpDropdown from "./HelpDropdown.vue";
import { createTestingI18n } from "@@/tests/test-utils/setup";

describe("@/components/topbar/HelpDropdown", () => {
	it("shows a list of menu items", () => {
		const wrapper = mount(HelpDropdown, {
			global: {
				plugins: [createTestingI18n()],
			},
		});

		expect(wrapper.findAll(".link")).toHaveLength(4);
	});
});
