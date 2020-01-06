import BaseInput from "./BaseInput";
import BaseInputDefault from "./BaseInputDefault";
import { supportedTypes } from "./BaseInputDefault";

function getMock(type, attributes) {
	return mount({
		data: () => ({ content: "" }),
		template: `<base-input v-model="content" label="test" type="${type}" name="test" ${attributes}/>`,
		components: { BaseInput },
	});
}

describe("@components/BaseInputDefault", () => {
	it("input has correct type", () => {
		supportedTypes.forEach((type) => {
			const wrapper = getMock(type);
			const textInput = wrapper.find(`input[type="${type}"]`);
			expect(textInput.exists()).toBe(true);
		});
	});

	it("changing the element's value, updates the v-model", () => {
		supportedTypes.forEach((type) => {
			const testInput = type === "number" ? 5 : "test string";
			const wrapper = getMock(type);
			const input = wrapper.find(`input[type="${type}"]`);
			input.setValue(testInput);
			expect(wrapper.vm.content).toBe(testInput);
		});
	});

	it("changing the v-model, updates the element's value", () => {
		supportedTypes.forEach((type) => {
			const testInput = type === "number" ? 5 : "test string";
			const wrapper = getMock(type);
			wrapper.setData({ content: testInput });
			const input = wrapper.find(`input[type="${type}"]`);
			expect(input.element.value.toString()).toBe(testInput.toString());
		});
	});

	it("rejects input if it is disabled", () => {
		supportedTypes.forEach((type) => {
			const testInput = type === "number" ? 5 : "test string";

			const disabledWrapper = getMock(type, "disabled");
			const disabledInput = disabledWrapper.find(`input[type="${type}"]`);
			disabledInput.setValue(testInput);
			expect(disabledWrapper.vm.content).not.toBe(testInput);

			const enabledWrapper = getMock(type);
			const enabledInput = enabledWrapper.find(`input[type="${type}"]`);
			enabledInput.setValue(testInput);
			expect(enabledWrapper.vm.content).toBe(testInput);
		});
	});

	it("shows its info", () => {
		supportedTypes.forEach((type) => {
			const wrapper = getMock(type, "info='info'");
			expect(wrapper.find(".help").text()).toBe("info");
		});
	});

	it("shows its label when no placeholder is provided", () => {
		supportedTypes.forEach((type) => {
			const wrapperWithoutPlaceholder = getMock(type);
			const baseInputDefaultWithoutPlaceholder = wrapperWithoutPlaceholder.find(
				BaseInputDefault
			);
			expect(baseInputDefaultWithoutPlaceholder.vm.showLabel).toBe(true);
			expect(wrapperWithoutPlaceholder.find(".label").isVisible()).toBe(true);
		});
	});

	it("shows its label when it contains a value", () => {
		supportedTypes.forEach((type) => {
			const testInput = type === "number" ? 5 : "test string";
			const wrapperWithPlaceHolder = getMock(type, "placeholder='placeholder'");
			const baseInputDefaultWithPlaceholder = wrapperWithPlaceHolder.find(
				BaseInputDefault
			);
			const input = wrapperWithPlaceHolder.find(`input[type="${type}"]`);

			expect(baseInputDefaultWithPlaceholder.vm.showLabel).toBe(false);
			expect(wrapperWithPlaceHolder.find(".label").isVisible()).toBe(false);

			input.setValue(testInput);
			expect(wrapperWithPlaceHolder.find(".label").isVisible()).toBe(true);
			expect(baseInputDefaultWithPlaceholder.vm.showLabel).toBe(true);
		});
	});

	it("shows its hint", () => {
		supportedTypes.forEach((type) => {
			const wrapper = getMock(type, "hint='hint'");
			expect(wrapper.find(".hint").text()).toBe("hint");
		});
	});

	it("can show error icon and error message", () => {
		supportedTypes.forEach((type) => {
			const wrapper = mount(BaseInput, {
				propsData: {
					vmodel: "",
					type,
					label: "test",
					error: "error",
				},
				stubs: ["base-icon"],
			});
			const baseInputDefault = wrapper.find(BaseInputDefault);
			expect(baseInputDefault.vm.hasError).toBe(true);

			expect(wrapper.find(".icon-behind").exists()).toBe(true);
			expect(wrapper.find(".error").exists()).toBe(true);
			expect(
				wrapper
					.findAll(".error")
					.at(1)
					.text()
			).toBe("error");
		});
	});

	it("can show success icon", () => {
		supportedTypes.forEach((type) => {
			const wrapper = mount(BaseInput, {
				propsData: {
					vmodel: "",
					type,
					label: "test",
					success: true,
				},
				stubs: ["base-icon"],
			});
			expect(wrapper.find(".icon-behind").exists()).toBe(true);
		});
	});

	it("can toggle pwd visibility", async () => {
		const wrapper = mount(BaseInput, {
			propsData: {
				vmodel: "",
				type: "password",
				label: "test",
			},
		});
		const inputField = wrapper.find("input");
		const pwdToggle = wrapper.find(`[data-testid="pwd-visibility-toggle"]`);
		expect(inputField.attributes("type")).toBe("password");
		pwdToggle.trigger("click");
		expect(inputField.attributes("type")).toBe("text");
	});

	it("should have an aria label if the label is hidden", () => {
		supportedTypes.forEach((type) => {
			const wrapper = mount(BaseInput, {
				propsData: {
					vmodel: "",
					type,
					label: "test",
					labelHidden: true,
				},
			});
			expect(wrapper.find(`[aria-label="test"]`).exists()).toBe(true);
		});
	});
});
