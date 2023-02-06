import InputRadio from "./Radio";

describe("@/components/organisms/DataFilter/inputs/Radio", () => {
	it("can preselect an option", async () => {
		const expectedValue = "25";
		const wrapper = mount(InputRadio, {
			propsData: {
				label: "Radio",
				value: expectedValue,
				options: [
					{ value: "10", label: "Radio1" },
					{ value: "25", label: "Radio2" },
					{ value: "100", label: "Radio3" },
				],
			},
		});
		const selectedOption = wrapper.get(`input[type="radio"]:checked`);
		expect(selectedOption.attributes("value")).toStrictEqual(expectedValue);
	});

	it("can choose an option", async () => {
		const wrapper = mount(InputRadio, {
			propsData: {
				label: "Radio",
				value: "100",
				options: [
					{ value: "10", label: "Radio1" },
					{ value: "25", label: "Radio2" },
					{ value: "100", label: "Radio3" },
				],
			},
		});
		const options = wrapper.findAll(`input[type="radio"]`);
		const selectedOption = options.at(0);
		const expectedValue = selectedOption.attributes("value");
		selectedOption.setChecked(true);
		expect(wrapper.emitted("input")).toStrictEqual([[expectedValue]]);
	});

	it("throws error if label in option is missing", () => {
		expect(() =>
			mount(InputRadio, {
				propsData: {
					options: [{ value: "10" }],
				},
			})
		).toThrow(new Error(`option 0 is missing a label`));
	});

	it("throws error if value in option is missing", () => {
		expect(() =>
			mount(InputRadio, {
				propsData: {
					options: [{ label: "Label 10" }],
				},
			})
		).toThrow(new Error(`option 0 is missing a value`));
	});
});
