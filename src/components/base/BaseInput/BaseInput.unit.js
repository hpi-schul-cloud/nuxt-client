import BaseInput from "./BaseInput";
import { supportedTypes } from "./BaseInput";
import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { logger } from "@util-logger";

function createWrapper(props = {}) {
	return mount(BaseInput, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props,
	});
}

describe("@/components/base/BaseInput", () => {
	it("all types have a label", () => {
		const testLabel = "MyTestLabel";
		supportedTypes
			.filter((type) => type !== "hidden") // hidden inputs doesn't need a label
			.forEach((type) => {
				const wrapper = createWrapper({
					label: testLabel,
					type,
				});
				expect(wrapper.find(".label").exists()).toBe(true);
				expect(wrapper.text()).toContain(testLabel);
			});
	});

	it("labels of checkboxes can be hidden", () => {
		const testLabel = "MyTestLabel";
		["checkbox"].forEach((type) => {
			const wrapper = createWrapper({
				label: testLabel,
				labelHidden: true,
				type,
			});
			expect(wrapper.find(".label").exists()).toBe(false);
			expect(wrapper.find("input").attributes("aria-label")).toBe(testLabel);
		});
	});

	it("all types are passing through attributes", () => {
		const attributes = { "data-test": "testAttrValue" };
		supportedTypes.forEach((type) => {
			const wrapper = createWrapper({
				modelValue: "",
				label: "test",
				name: "test",
				value: "test",
				type,
				...attributes,
			});
			const input = wrapper.find("input, .input");
			Object.keys(attributes).forEach((attr) => {
				expect(input.attributes(attr)).toBe(attributes[attr]);
			});
		});
	});

	it("writes an error to the console on unsupported types", () => {
		vi.spyOn(logger, "error");
		createWrapper({
			type: "unsupported",
		});
		expect(logger.error).toHaveBeenCalled();
	});
});
