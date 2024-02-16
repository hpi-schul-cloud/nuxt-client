import { createTestingI18n } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import SkipLinks from "./SkipLinks.vue";

describe("@/components/molecules/SkipLinks", () => {
	it("Should render its skip link", async () => {
		const wrapper = mount(SkipLinks, {
			global: {
				plugins: [createTestingI18n()],
			},
		});

		expect(wrapper.find("#skip-link").exists()).toBe(true);
	});

	it("Should have tabindex 0", async () => {
		const wrapper = mount(SkipLinks, {
			global: {
				plugins: [createTestingI18n()],
			},
		});

		expect(wrapper.attributes("tabindex")).toBe("0");
	});
});
