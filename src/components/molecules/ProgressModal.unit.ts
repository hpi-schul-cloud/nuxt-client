import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import ProgressModal from "./ProgressModal.vue";

describe("@/components/molecules/ProgressModal", () => {
	it(`check props are set correctly `, () => {
		const wrapper = mount(ProgressModal, {
			plugins: [createTestingVuetify()],
			props: {
				title: "title",
				description: "description",
				active: true,
				percent: 50,
			},
		});

		expect(wrapper.text()).toContain("title");
		expect(wrapper.text()).toContain("description");
	});
});
