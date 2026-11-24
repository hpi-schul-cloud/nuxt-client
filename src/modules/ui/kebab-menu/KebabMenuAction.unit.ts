import KebabMenuAction from "./KebabMenuAction.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("KebabMenuAction", () => {
	const setup = (disabled: boolean) =>
		mount(KebabMenuAction, {
			props: { disabled },
			slots: { default: "Action" },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

	it("exposes the disabled state to assistive technology", () => {
		const wrapper = setup(true);

		expect(wrapper.get("[role='menuitem']").attributes("aria-disabled")).toBe("true");
	});

	it("does not set aria-disabled on enabled actions", () => {
		const wrapper = setup(false);

		expect(wrapper.get("[role='menuitem']").attributes("aria-disabled")).toBeUndefined();
	});
});
