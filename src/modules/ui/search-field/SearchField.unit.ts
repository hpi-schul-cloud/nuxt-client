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

	it("renders a VTextField", () => {
		const wrapper = setup();
		expect(wrapper.findComponent({ name: "VTextField" }).exists()).toBe(true);
	});

	it("uses default aria-label from i18n when none is provided", () => {
		const wrapper = setup();
		const input = wrapper.find("input");

		expect(input.attributes("aria-label")).toBe("common.labels.search");
	});

	it("uses provided aria-label attribute when passed", () => {
		const wrapper = setup({
			attrs: {
				"aria-label": "Custom search label",
			},
		});

		const input = wrapper.find("input");
		expect(input.attributes("aria-label")).toBe("Custom search label");
	});

	it("uses default data-testid when none is provided", () => {
		const wrapper = setup();
		expect(wrapper.find('[data-testid="search-field"]').exists()).toBe(true);
	});

	it("uses provided data-testid attribute when passed", () => {
		const wrapper = setup({
			attrs: {
				"data-testid": "my-search",
			},
		});

		expect(wrapper.find('[data-testid="my-search"]').exists()).toBe(true);
	});
});
