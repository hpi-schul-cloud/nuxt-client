import SearchField from "./SearchField.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";

describe("@ui-search-field", () => {
	const setup = (options = {}) => {
		const wrapper = mount(SearchField, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
		});

		return wrapper;
	};

	it("should render correctly", () => {
		const wrapper = setup();
		expect(wrapper.exists()).toBe(true);
	});
});
