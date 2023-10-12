import { ContentElementTitle } from "@ui-board";
import { shallowMount } from "@vue/test-utils";

describe("ContentElementTitle", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const title = "Title Text";
		const wrapper = shallowMount(ContentElementTitle, {
			slots: {
				default: title,
			},
		});

		return {
			wrapper,
			title,
		};
	};

	it("renders correctly", () => {
		const { wrapper, title } = setup();

		expect(wrapper.text()).toBe(title);
	});
});
