import WarningChip from "./WarningChip.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiAlert } from "@icons/material";
import { mount } from "@vue/test-utils";
import { VChip, VIcon } from "vuetify/lib/components/index";

describe("WarningChip", () => {
	const getWrapper = () => {
		const slotContent = "Slot Content";
		const wrapper = mount(WarningChip, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					VIcon: true,
				},
			},
			slots: { default: slotContent },
		});

		return {
			wrapper,
			slotContent,
		};
	};

	describe("when warning chip is used", () => {
		it("should render the warning chip", () => {
			const { wrapper } = getWrapper();

			const chip = wrapper.findComponent(VChip);

			expect(chip.exists()).toBeTruthy();
		});

		it("should contain an mdiAlert icon", () => {
			const { wrapper } = getWrapper();

			const icon = wrapper.findComponent(VIcon);

			expect(icon.exists()).toBeTruthy();
			expect(icon.props("color")).toBe("warning");
			expect(icon.text()).toBe(mdiAlert);
		});

		it("should render content passed in the default slot", () => {
			const { wrapper, slotContent } = getWrapper();

			const text = wrapper.text();

			expect(text).toContain(slotContent);
		});
	});
});
