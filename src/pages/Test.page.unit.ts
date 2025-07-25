//  TODO REMOVE THIS TEST

import { createTestingVuetify } from "@@/tests/test-utils/setup";
import TestPage from "./Test.page.vue";

describe("Test.page.unit.ts", () => {
	it("should render the Test page", () => {
		const wrapper = mount(TestPage, {
			global: {
				plugins: [createTestingVuetify()],
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
});
