import { mount } from "@vue/test-utils";
import { mdiInformation } from "@icons/material";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import InfoChip from "./InfoChip.vue";
import { VChip, VIcon } from "vuetify/lib/components/index";

describe("InfoChip", () => {
	const getWrapper = () => {
		const slotContent = "Slot Content";
		const wrapper = mount(InfoChip, {
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

	describe("when info chip is used", () => {
		it("should render the info chip", () => {
			const { wrapper } = getWrapper();

			const chip = wrapper.findComponent(VChip);

			expect(chip.exists()).toBeTruthy();
		});

		it("should contain an mdiInformation icon", () => {
			const { wrapper } = getWrapper();

			const icon = wrapper.findComponent(VIcon);

			expect(icon.exists()).toBeTruthy();
			expect(icon.attributes("color")).toBe("info");
			expect(icon.text()).toBe(mdiInformation);
		});

		it("should render content passed in the default slot", () => {
			const { wrapper, slotContent } = getWrapper();

			const text = wrapper.text();

			expect(text).toContain(slotContent);
		});
	});
});
