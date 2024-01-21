import ContentElementTitleIcon from "./ContentElementTitleIcon.vue";
import { shallowMount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe("ContentElementTitleIcon", () => {
	const setup = () => {
		const icon = "mdi-test";
		const wrapper = shallowMount(ContentElementTitleIcon, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				icon: icon,
			},
		});

		return {
			wrapper,
			icon,
		};
	};

	it("renders correctly", () => {
		const { wrapper, icon } = setup();

		expect(wrapper.text()).toBe(icon);
	});
});
