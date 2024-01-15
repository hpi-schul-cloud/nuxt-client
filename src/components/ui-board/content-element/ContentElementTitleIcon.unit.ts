import ContentElementTitleIcon from "./ContentElementTitleIcon.vue";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue from "vue";

describe("ContentElementTitleIcon", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const icon = "mdi-test";
		const wrapper = shallowMount(ContentElementTitleIcon as MountOptions<Vue>, {
			propsData: {
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
