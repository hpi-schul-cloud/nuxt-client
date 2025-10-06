import BaseAlert from "./BaseAlert.vue";
import ErrorAlert from "./ErrorAlert.vue";
import { mdiAlertCircle } from "@icons/material";
import { shallowMount } from "@vue/test-utils";

describe("ErrorAlert", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const slot = "TestSlot";
		const wrapper = shallowMount(ErrorAlert, {
			slots: {
				default: slot,
			},
		});

		return {
			wrapper,
			slot,
		};
	};

	it("should pass correct color to filealert", () => {
		const { wrapper } = setup();

		const color = wrapper.findComponent(BaseAlert).attributes("color");

		expect(color).toBe("error");
	});

	it("should pass correct icon to filealert", () => {
		const { wrapper } = setup();

		const icon = wrapper.findComponent(BaseAlert).attributes("icon");

		expect(icon).toBe(mdiAlertCircle);
	});

	it("should pass slot to filealert", () => {
		const { wrapper, slot } = setup();

		const text = wrapper.findComponent(BaseAlert).text();

		expect(text).toContain(slot);
	});
});
