import ContentElementDisplay from "./ContentElementDisplay.vue";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue from "vue";

describe("ContentElementDisplay", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");
		const menu = "menu-placeholder";
		const display = "display-placeholder";

		const wrapper = shallowMount(ContentElementDisplay as MountOptions<Vue>, {
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
