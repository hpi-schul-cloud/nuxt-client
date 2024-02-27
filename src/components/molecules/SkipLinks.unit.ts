import { createTestingI18n } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import SkipLinks from "./SkipLinks.vue";

describe("@/components/molecules/SkipLinks", () => {
	const setup = () => {
		const wrapper = mount(SkipLinks, {
			global: {
				plugins: [createTestingI18n()],
				mocks: {
					$route: { hash: "" },
				},
			},
		});

		return { wrapper };
	};

	it("Should render its skip link", async () => {
		const { wrapper } = setup();

		expect(wrapper.find("#skip-link").exists()).toBe(true);
	});

	it("Should have tabindex 0", async () => {
		const { wrapper } = setup();

		expect(wrapper.attributes("tabindex")).toBe("0");
	});
});
