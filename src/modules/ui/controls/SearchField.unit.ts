import SearchField from "./SearchField.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";

describe("@ui-controls/SearchField", () => {
	const setup = (options = {}) =>
		mount(SearchField, {
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
