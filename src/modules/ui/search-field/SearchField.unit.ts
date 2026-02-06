import SearchField from "./SearchField.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiMagnify } from "@icons/material";
import { VTextField } from "vuetify/components";

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

	it("should have mdiMagnify as prepend-inner-icon", () => {
		const wrapper = setup();
		expect(wrapper.findComponent(VTextField).props("prependInnerIcon")).toBe(mdiMagnify);
	});
});
