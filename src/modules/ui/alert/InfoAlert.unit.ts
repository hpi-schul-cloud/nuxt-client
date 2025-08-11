import { mdiInformation } from "@icons/material";
import { shallowMount } from "@vue/test-utils";
import BaseAlert from "./BaseAlert.vue";
import InfoAlert from "./InfoAlert.vue";

describe("InfoAlert", () => {
	const setup = (
		options?: Partial<{
			showCloseIcon: boolean;
			alertTitle: string;
		}>
	) => {
		const slot = "TestSlot";
		const wrapper = shallowMount(InfoAlert, {
			slots: {
				default: slot,
			},
			props: {
				showCloseIcon: options?.showCloseIcon ?? false,
				alertTitle: options?.alertTitle ?? undefined,
			},
		});

		return {
			wrapper,
			slot,
		};
	};

	it("should pass correct color to basealert", () => {
		const { wrapper } = setup();

		const color = wrapper.findComponent(BaseAlert).attributes("color");

		expect(color).toBe("info");
	});

	it("should pass correct icon to basealert", () => {
		const { wrapper } = setup();

		const icon = wrapper.findComponent(BaseAlert).attributes("icon");

		expect(icon).toBe(mdiInformation);
	});

	it("should pass alertTitle to basealert", () => {
		const alertTitleText = "Test Alert Title";
		const { wrapper } = setup({ alertTitle: alertTitleText });

		const alertTitle = wrapper.findComponent(BaseAlert).props("alertTitle");

		expect(alertTitle).toBe(alertTitleText);
	});

	it("should pass show close icon to basealert", () => {
		const { wrapper } = setup({ showCloseIcon: true });

		const showCloseIcon = wrapper
			.findComponent(BaseAlert)
			.props("showCloseIcon");

		expect(showCloseIcon).toBe(true);
	});

	it("should pass slot to basealert", () => {
		const { wrapper, slot } = setup();

		const text = wrapper.findComponent(BaseAlert).text();

		expect(text).toContain(slot);
	});
});
