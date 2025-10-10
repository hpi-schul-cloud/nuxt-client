import InputWrapperWithCheckmark from "./InputWrapperWithCheckmark.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("InputWrapperWithCheckmark", () => {
	const setup = (options = {}) => {
		const wrapper = mount(InputWrapperWithCheckmark, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
		});

		return wrapper;
	};

	it("should render component", () => {
		const wrapper = setup();

		const inputWrapperWithCheckmark = wrapper.findComponent(InputWrapperWithCheckmark);

		expect(inputWrapperWithCheckmark.exists()).toBe(true);
	});

	it("should emit confirm on click", async () => {
		const wrapper = setup();

		const btn = wrapper.findComponent(InputWrapperWithCheckmark).find("button");
		btn.trigger("click");

		expect(wrapper.emitted("confirm")).toHaveLength(1);
	});
});
