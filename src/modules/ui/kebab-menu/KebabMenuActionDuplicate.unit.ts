import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { KebabMenuActionDuplicate } from "@ui-kebab-menu";
import { mount } from "@vue/test-utils";

describe("KebabMenuActionDuplicate", () => {
	it("should render component", () => {
		const wrapper = mount(KebabMenuActionDuplicate, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.text()).toBe("common.actions.duplicate");
	});

	it("should set generic data-testid", () => {
		const wrapper = mount(KebabMenuActionDuplicate, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		expect(wrapper.attributes("data-testid")).toBe("kebab-menu-action-duplicate");
	});

	it("should set custom data-testid", () => {
		const wrapper = mount(KebabMenuActionDuplicate, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			attrs: {
				"data-testid": "custom-duplicate-action",
			},
		});

		expect(wrapper.attributes("data-testid")).toBe("custom-duplicate-action");
	});
});
