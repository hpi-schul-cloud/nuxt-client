import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import ProgressModal from "./ProgressModal.vue";

describe("@/components/molecules/ProgressModal", () => {
	it(`check props are set correctly `, () => {
		const wrapper = mount(ProgressModal, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props: {
				title: "title",
				description: "description",
				active: true,
				percent: 50,
			},
		});

		const dialogCard = wrapper
			.findComponent({ name: "v-dialog" })
			.getComponent({ name: "v-card" });

		expect(dialogCard.text()).toContain("title");
		expect(dialogCard.text()).toContain("description");
	});
});
