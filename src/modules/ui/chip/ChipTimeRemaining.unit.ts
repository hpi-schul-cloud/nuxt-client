import ChipTimeRemaining from "./ChipTimeRemaining.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("ChipTimeRemaining", () => {
	const setup = (dueDate: Date) => {
		const wrapper = mount(ChipTimeRemaining, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				dueDate: dueDate.toISOString(),
			},
		});

		return { wrapper };
	};

	it("should render relative time text", () => {
		const futureDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
		const { wrapper } = setup(futureDate);

		expect(wrapper.text()).toBeTruthy();
	});
});
