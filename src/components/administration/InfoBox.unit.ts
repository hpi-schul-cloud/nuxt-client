import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import InfoBox from "./InfoBox.vue";
import { VNode } from "vue";

type MountingSlots = Record<string, string | (() => VNode[])>;

describe("@/components/administration/InfoBox", () => {
	describe("when active is true", () => {
		const setup = (slots: MountingSlots) => {
			const wrapper = mount(InfoBox, {
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				props: {
					active: true,
				},
				slots,
			});

			return {
				wrapper,
			};
		};

		it("renders header slot content", () => {
			const testSlot = "header slot";
			const { wrapper } = setup({ header: testSlot });

			expect(wrapper.html()).toContain(testSlot);
		});

		it("renders body slot content", () => {
			const testSlot = "body slot";
			const { wrapper } = setup({ body: testSlot });

			expect(wrapper.html()).toContain(testSlot);
		});

		it("renders actions slot content", () => {
			const testSlot = "actions slot";
			const { wrapper } = setup({ actions: testSlot });

			expect(wrapper.html()).toContain(testSlot);
		});
	});

	describe("when active is false", () => {
		const setup = (slots: MountingSlots) => {
			const wrapper = mount(InfoBox, {
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				props: {
					active: false,
				},
				slots,
			});

			return {
				wrapper,
			};
		};

		it("does not render header slot content", () => {
			const testSlot = "header slot";
			const { wrapper } = setup({ header: testSlot });

			expect(wrapper.html()).not.toContain(testSlot);
		});

		it("does not render body slot content", () => {
			const testSlot = "body slot";
			const { wrapper } = setup({ body: testSlot });

			expect(wrapper.html()).not.toContain(testSlot);
		});

		it("does not render actions slot content", () => {
			const testSlot = "actions slot";
			const { wrapper } = setup({ actions: testSlot });

			expect(wrapper.html()).not.toContain(testSlot);
		});
	});
});
