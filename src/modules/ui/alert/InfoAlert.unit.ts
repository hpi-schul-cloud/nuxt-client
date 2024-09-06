import { mdiInformation } from "@icons/material";
import { shallowMount } from "@vue/test-utils";
import BaseAlert from "./BaseAlert.vue";
import InfoAlert from "./InfoAlert.vue";

describe("InfoAlert", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const slot = "TestSlot";
		const wrapper = shallowMount(InfoAlert, {
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

		expect(color).toBe("info");
	});

	it("should pass correct icon to filealert", () => {
		const { wrapper } = setup();

		const icon = wrapper.findComponent(BaseAlert).attributes("icon");

		expect(icon).toBe(mdiInformation);
	});

	it("should pass slot to filealert", () => {
		const { wrapper, slot } = setup();

		const text = wrapper.findComponent(BaseAlert).text();

		expect(text).toContain(slot);
	});
});
