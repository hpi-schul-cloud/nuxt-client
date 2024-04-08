import { mount } from "@vue/test-utils";
import HelpDropdown from "./HelpDropdown.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { VListItem } from "vuetify/lib/components/index.mjs";

describe("@/components/topbar/HelpDropdown", () => {
	it("shows a list of menu items", () => {
		const wrapper = mount(HelpDropdown, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
		});

		const allListItems = wrapper.findAllComponents(VListItem);

		expect(allListItems).toHaveLength(4);
	});
});
