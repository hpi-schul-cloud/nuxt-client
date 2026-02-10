import SvsSearchField from "./SvsSearchField.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";

describe("SvsSearchField", () => {
	const setup = (options = {}) =>
		mount(SvsSearchField, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
		});

	it("should render correctly", () => {
		const wrapper = setup();
		expect(wrapper.exists()).toBe(true);
	});
});
