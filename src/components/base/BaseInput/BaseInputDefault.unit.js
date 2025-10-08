import BaseInput from "./BaseInput";
import BaseInputDefault, { supportedTypes } from "./BaseInputDefault";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";

function createWrapper(type, props = {}) {
	return mount(BaseInput, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props: {
			label: "test",
			type,
			...props,
		},
	});
}

const mockInput = (type) => {
	switch (type) {
		case "number":
			return 5;
		case "time":
			return "08:12";
		case "date":
			return "2020-01-01";
		default:
			return "test string";
	}
};

describe("@/components/base/BaseInputDefault", () => {
	it("input has correct type", () => {
		supportedTypes.forEach((type) => {
			const wrapper = createWrapper(type);
			const textInput = wrapper.find(`input[type="${type}"]`);
			expect(textInput.exists()).toBe(true);
		});
	});

	it("changing the element's value, updates the v-model", () => {
		supportedTypes.forEach((type) => {
			const testInput = mockInput(type);
			const wrapper = createWrapper(type);
			const input = wrapper.find(`input[type="${type}"]`);
			input.setValue(testInput);
			expect(wrapper.emitted("update:modelValue")[0][0]).toEqual(testInput);
		});
	});

	it("changing the v-model, updates the element's value", async () => {
		await Promise.all(
			supportedTypes.map(async (type) => {
				const testInput = mockInput(type);
				const wrapper = createWrapper(type);
				await wrapper.setProps({ modelValue: testInput });
				const input = wrapper.find(`input[type="${type}"]`);
				expect(input.element.value.toString()).toBe(testInput.toString());
			})
		);
	});

	it("rejects input if it is disabled", () => {
		supportedTypes.forEach((type) => {
			const testInput = mockInput(type);

			const disabledWrapper = createWrapper(type, { disabled: true });
			const disabledInput = disabledWrapper.find(`input[type="${type}"]`);
			disabledInput.setValue(testInput);
			expect(disabledWrapper.emitted("update:modelValue")).toBeUndefined();

			const enabledWrapper = createWrapper(type);
			const enabledInput = enabledWrapper.find(`input[type="${type}"]`);
			enabledInput.setValue(testInput);
			expect(enabledWrapper.emitted("update:modelValue").length).toBe(1);
		});
	});

	it("shows its info", () => {
		supportedTypes.forEach((type) => {
			const wrapper = createWrapper(type, { info: "info" });
			expect(wrapper.find(".help").text()).toBe("info");
		});
	});

	it("shows its label when no placeholder is provided", () => {
		supportedTypes.forEach((type) => {
			const wrapperWithoutPlaceholder = createWrapper(type);
			const baseInputDefaultWithoutPlaceholder = wrapperWithoutPlaceholder.findComponent(BaseInputDefault);
			expect(baseInputDefaultWithoutPlaceholder.vm.showLabel).toBe(true);
			expect(wrapperWithoutPlaceholder.find(".label").exists()).toBe(true);
		});
	});

	it("shows its label when it contains a value", async () => {
		await Promise.all(
			supportedTypes.map(async (type) => {
				const testInput = mockInput(type);
				const wrapperWithPlaceHolder = createWrapper(type, {
					placeholder: "placeholder",
				});
				const baseInputDefaultWithPlaceholder = wrapperWithPlaceHolder.findComponent(BaseInputDefault);

				expect(baseInputDefaultWithPlaceholder.vm.showLabel).toBe(false);
				expect(wrapperWithPlaceHolder.find(".label").element.style.display).toBe("none");

				await wrapperWithPlaceHolder.setProps({ modelValue: testInput });

				expect(wrapperWithPlaceHolder.find(".label").element.style.display).toBe("");
				expect(baseInputDefaultWithPlaceholder.vm.showLabel).toBe(true);
			})
		);
	});

	it("shows its hint", () => {
		supportedTypes.forEach((type) => {
			const wrapper = createWrapper(type, { hint: "hint" });
			expect(wrapper.find(".hint").text()).toBe("hint");
		});
	});

	it("can show error icon and error message", () => {
		supportedTypes.forEach((type) => {
			const wrapper = createWrapper(type, { error: "error" });

			const baseInputDefault = wrapper.findComponent(BaseInputDefault);
			expect(baseInputDefault.vm.hasError).toBe(true);

			expect(wrapper.find(".icon-behind").exists()).toBe(true);
			expect(wrapper.find(".base-input-error").exists()).toBe(true);
			expect(wrapper.findAll(".base-input-error").at(1).text()).toBe("error");
		});
	});

	it("can show success icon", () => {
		supportedTypes.forEach((type) => {
			const wrapper = createWrapper(type, { success: true });

			expect(wrapper.find(".icon-behind").exists()).toBe(true);
		});
	});

	it("can toggle pwd visibility", async () => {
		const wrapper = createWrapper("password");

		const inputField = wrapper.find("input");
		const pwdToggle = wrapper.find(`[data-testid="pwd-visibility-toggle"]`);
		expect(inputField.attributes("type")).toBe("password");
		pwdToggle.trigger("click");
		await wrapper.vm.$nextTick();
		expect(inputField.attributes("type")).toBe("text");
	});

	it("should have an aria label if the label is hidden", () => {
		supportedTypes.forEach((type) => {
			const wrapper = createWrapper(type, { label: "test", labelHidden: true });

			expect(wrapper.find(`[aria-label="test"]`).exists()).toBe(true);
		});
	});
});
