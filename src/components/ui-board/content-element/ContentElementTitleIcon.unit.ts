import { ContentElementTitleIcon } from "@ui-board";
import { shallowMount } from "@vue/test-utils";

describe("ContentElementTitleIcon", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const icon = "mdi-test";
		const wrapper = shallowMount(ContentElementTitleIcon, {
			propsData: {
				icon,
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
