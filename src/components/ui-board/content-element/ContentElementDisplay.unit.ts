import ContentElementDisplay from "./ContentElementDisplay.vue";
import { shallowMount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe("ContentElementDisplay", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");
		const menu = "menu-placeholder";
		const display = "display-placeholder";

		const wrapper = shallowMount(ContentElementDisplay, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			slots: {
				display,
				menu,
			},
		});

		return {
			wrapper,
			display,
			menu,
		};
	};

	it("renders correctly", () => {
		const { wrapper, display, menu } = setup();

		expect(wrapper.text()).toEqual(expect.stringContaining(display));
		expect(wrapper.text()).toEqual(expect.stringContaining(menu));
	});
});
