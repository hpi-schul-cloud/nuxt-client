import { mount } from "@vue/test-utils";
import LernStoreGrid from "./LernStoreGrid.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";

describe("@/components/lern-store/LernStoreGrid", () => {
	const wrapper = mount(LernStoreGrid, {
		global: {
			plugins: [createTestingVuetify()],
		},
	});

	it("should render component", () => {
		expect(wrapper.findComponent(LernStoreGrid).exists()).toBe(true);
	});
});
