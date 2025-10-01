import TopbarItem from "./TopbarItem.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiAlert } from "@icons/material";
import { mount } from "@vue/test-utils";

describe("@ui-layout/TopbarItem", () => {
	const setup = () => {
		const wrapper = mount(TopbarItem, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				icon: mdiAlert,
			},
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should render", () => {
			const wrapper = setup();

			expect(wrapper.exists()).toBe(true);
		});
	});
});
