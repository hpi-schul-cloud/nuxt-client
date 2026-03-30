import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { SvsColorPicker } from "@ui-color-picker";

describe("SvsColorPicker", () => {
	const setup = () => {
		const wrapper = mount(SvsColorPicker, {
			global: {
				plugins: [createTestingVuetify()],
			},
		});

		return {
			wrapper,
		};
	};

	it("renders the component", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	it("renders the correct number of swatches", () => {
		const { wrapper } = setup();
		const swatches = wrapper.findAll(".swatch");
		expect(swatches.length).toBe(11);
	});
});
