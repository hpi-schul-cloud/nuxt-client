import KebabMenuActionRejectRequest from "./KebabMenuActionRejectRequest.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { KebabMenuAction } from "@ui-kebab-menu";
import { mount } from "@vue/test-utils";

describe("KebabMenuActionRejectRequest", () => {
	const setup = () => {
		const wrapper = mount(KebabMenuActionRejectRequest, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should render", () => {
			const wrapper = setup();

			const action = wrapper.findComponent(KebabMenuAction);

			expect(action.exists()).toBe(true);
		});
	});
});
