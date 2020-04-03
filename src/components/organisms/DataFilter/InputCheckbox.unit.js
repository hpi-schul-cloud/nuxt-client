import InputCheckbox from "./InputCheckbox";

describe("@components/organisms/DataFilter/InputCheckbox", () => {
	it.skip("can choose an option", async () => {
		const wrapper = mount(InputCheckbox, {
			propsData: {
				label: "Checkbox",
				value: ["A"],
				options: [
					{ value: "A", label: "Checkbox 1" },
					{ value: "B", label: "Checkbox 2" },
					{ value: "C", label: "Checkbox 3" },
				],
			},
		});
		const options = wrapper.findAll(`input[type="checkbox"]`);
		const selectedOption = options.at(0);
		const expectedValue = selectedOption.attributes("value");
		selectedOption.setChecked();
		expect(wrapper.vm.value).toStrictEqual([expectedValue]);
	});

	it.skip("throws error if label in option is missing", () => {
		expect(() =>
			mount(InputCheckbox, {
				propsData: {
					options: [{ value: "A" }],
				},
			})
		).toThrow(new Error(`option 0 is missing a label`));
	});

	it.skip("throws error if value in option is missing", () => {
		expect(() =>
			mount(InputCheckbox, {
				propsData: {
					options: [{ label: "Checkbox 1" }],
				},
			})
		).toThrow(new Error(`option 0 is missing a value`));
	});
});
