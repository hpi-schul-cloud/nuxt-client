import { shallowMount } from "@vue/test-utils";
import BaseAlert from "./BaseAlert.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";

describe("BaseAlert", () => {
	describe("when default slot is defined", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const slot = "TestSlot";
			const color = "success";
			const icon = "TestIcon";
			const wrapper = shallowMount(BaseAlert, {
				global: {
					plugins: [createTestingVuetify()],
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
			document.body.setAttribute("data-app", "true");

			const wrapper = shallowMount(BaseAlert, {
				global: {
					plugins: [createTestingVuetify()],
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
});
