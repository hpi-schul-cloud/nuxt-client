import { shallowMount } from "@vue/test-utils";
import BaseAlert from "./BaseAlert.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { VAlert } from "vuetify/components";

describe("BaseAlert", () => {
	describe("when default slot is defined", () => {
		const setup = () => {
			const slot = "TestSlot";
			const color = "success";
			const icon = "TestIcon";
			const wrapper = shallowMount(BaseAlert, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					color,
					icon,
				},
				slots: {
					default: slot,
				},
			});

			return {
				wrapper,
				slot,
				color,
				icon,
			};
		};

		it("should render default slot", () => {
			const { wrapper, slot } = setup();

			const text = wrapper.text();

			expect(text).toContain(slot);
		});

		it("should pass color", () => {
			const { wrapper, color } = setup();

			const attribute = wrapper.attributes("color");

			expect(attribute).toBe(color);
		});

		it("should pass icon", () => {
			const { wrapper, icon } = setup();

			const attribute = wrapper.attributes("icon");

			expect(attribute).toBe(icon);
		});
	});

	describe("when default slot is not defined", () => {
		const setup = () => {
			const wrapper = shallowMount(BaseAlert, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
			});

			return {
				wrapper,
			};
		};

		it("should not render default slot", () => {
			const { wrapper } = setup();

			const text = wrapper.find("div.alert-text");

			expect(text.exists()).toBeFalsy();
		});
	});

	describe("alert title", () => {
		const setup = (
			options?: Partial<{
				hasAlertTitle: boolean;
			}>
		) => {
			const alertTitle = "Test Alert Title";
			const wrapper = mount(BaseAlert, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					alertTitle: options?.hasAlertTitle ? alertTitle : undefined,
				},
			});

			return {
				wrapper,
				alertTitle,
			};
		};

		it("should render alert title when alert title is defined", () => {
			const { wrapper, alertTitle } = setup({ hasAlertTitle: true });

			const title = wrapper.getComponent(VAlert).find("span.alert-text");

			expect(title.text()).toBe(alertTitle);
		});

		it("should not render alert title when alert title is not defined", () => {
			const { wrapper } = setup({ hasAlertTitle: false });

			const title = wrapper.getComponent(VAlert).find("span.alert-text");

			expect(title.exists()).toBe(false);
		});
	});
});
