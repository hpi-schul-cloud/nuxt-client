import CardAddElementMenu from "./CardAddElementMenu.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";

describe("CardAddElementMenu", () => {
	const setup = () => {
		const wrapper = shallowMount(CardAddElementMenu, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
		});
		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const wrapper = setup();
			expect(wrapper.findComponent(CardAddElementMenu).exists()).toBe(true);
		});
	});
});
