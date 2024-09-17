import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import KebabMenu from "./KebabMenu.vue";

describe("@ui-kebab-menu", () => {
	const setup = () => {
		const wrapper = mount(KebabMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
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