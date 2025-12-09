import BaseChip from "./BaseChip.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { VChip } from "vuetify/components";

describe("BaseChip", () => {
	const setup = () => {
		const slotContent = "Slot content";
		const color = "info";
		const icon = "TestIcon";
		const wrapper = mount(BaseChip, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props: {
				color,
				icon,
			},
			slots: { default: slotContent },
		});

		return {
			wrapper,
			slotContent,
			color,
			icon,
		};
	};

	it("should render the chip", () => {
		const { wrapper } = setup();

		const chip = wrapper.findComponent(VChip);

		expect(chip.exists()).toBeTruthy();
	});

	it("should pass color", () => {
		const { wrapper, color } = setup();

		const chip = wrapper.findComponent(VChip);

		expect(chip.props("color")).toBe(color);
	});

	it("should pass icon", () => {
		const { wrapper, icon } = setup();

		const chip = wrapper.findComponent(VChip);

		expect(chip.props("prependIcon")).toBe(icon);
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
			const wrapper = mount(BaseChip, {
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
