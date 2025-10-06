import BaseModal from "./BaseModal.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("@/components/base/BaseModal", () => {
	const setup = (options = {}) => {
		const wrapper = mount(BaseModal, {
			global: {
				plugins: [createTestingVuetify()],
			},
			...options,
		});
		return { wrapper };
	};

	it("changing the active property should open and close the modal", async () => {
		const { wrapper } = setup();

		expect(wrapper.findComponent({ name: "v-card" }).exists()).toBe(false);
		await wrapper.setProps({ active: true });
		expect(wrapper.findComponent({ name: "v-card" }).exists()).toBe(true);
	});
});
