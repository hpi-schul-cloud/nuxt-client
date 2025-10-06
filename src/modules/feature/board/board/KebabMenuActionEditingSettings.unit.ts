import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import KebabMenuActionEditingSettings from "./KebabMenuActionEditingSettings.vue";

describe("KebabMenuActionEditingSettings", () => {
	it("should render the component", async () => {
		const wrapper = mount(KebabMenuActionEditingSettings, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.text()).toBe("components.board.menu.editing.settings.title");
	});
});
