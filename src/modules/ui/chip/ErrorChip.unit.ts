import BaseChip from "./BaseChip.vue";
import ErrorChip from "./ErrorChip.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiAlertCircle } from "@icons/material";
import { VChip } from "vuetify/components";

describe("ErrorChip", () => {
	const setup = () => {
		const slotContent = "Slot content";
		const icon = "TestIcon";
		const wrapper = mount(ErrorChip, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props: {
				icon,
			},
			slots: { default: slotContent },
		});

		return {
			wrapper,
			slotContent,
			icon,
		};
	};

	it("should render the error chip", () => {
		const { wrapper } = setup();

		const chip = wrapper.findComponent(VChip);

		expect(chip.exists()).toBeTruthy();
	});

	describe("when icon is provided", () => {
		it("should pass icon", () => {
			const { wrapper, icon } = setup();

			const chip = wrapper.findComponent(BaseChip);

			expect(chip.props("icon")).toBe(icon);
		});
	});

	describe("when icon is not provided", () => {
		const setup = () => {
			const wrapper = mount(ErrorChip, {
				global: {
					plugins: [createTestingVuetify()],
				},
			});

			return {
				wrapper,
			};
		};

		it("should pass default icon", () => {
			const { wrapper } = setup();

			const chip = wrapper.findComponent(BaseChip);

			expect(chip.props("icon")).toBe(mdiAlertCircle);
		});
	});

	describe("when default slot is defined", () => {
		it("should render content passed in the default slot", () => {
			const { wrapper, slotContent } = setup();

			const text = wrapper.text();

			expect(text).toContain(slotContent);
		});
	});

	describe("when default slot is not defined", () => {
		const setup = () => {
			const slotContent = "Slot content";
			const wrapper = mount(ErrorChip, {
				global: {
					plugins: [createTestingVuetify()],
				},
			});

			return {
				wrapper,
				slotContent,
			};
		};

		it("should not render default slot", () => {
			const { wrapper, slotContent } = setup();

			const text = wrapper.text();

			expect(text).not.toContain(slotContent);
		});
	});
});
