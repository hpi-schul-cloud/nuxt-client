import SvsColorPicker from "./SvsColorPicker.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";

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
