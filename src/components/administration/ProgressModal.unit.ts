import ProgressModal from "./ProgressModal.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { VCard, VDialog } from "vuetify/components";

describe("ProgressModal", () => {
	it(`check props are set correctly `, () => {
		const wrapper = mount(ProgressModal, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props: {
				title: "title",
				description: "description",
				modelValue: true,
				percent: 50,
			},
		});

		const dialogCard = wrapper.findComponent(VDialog).getComponent(VCard);

		expect(dialogCard.text()).toContain("title");
		expect(dialogCard.text()).toContain("description");
	});
});
