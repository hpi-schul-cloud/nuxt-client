import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { SvsColorPickerMenu } from "@ui-color-picker";

describe("SvsColorPickerMenu", () => {
	const setup = () => {
		const wrapper = mount(SvsColorPickerMenu, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
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
});
