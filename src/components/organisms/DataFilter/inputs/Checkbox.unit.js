import InputCheckbox from "./Checkbox";

describe("@/components/organisms/DataFilter/inputs/Checkbox", () => {
	it("can preselect an option", async () => {
		const expectedValue = ["A", "B"];
		const wrapper = mount(InputCheckbox, {
			propsData: {
				label: "Chechbox",
				value: expectedValue,
				options: [
					{ value: "A", label: "Checkbox 1" },
					{ value: "B", label: "Checkbox 2" },
					{ value: "C", label: "Checkbox 3" },
				],
			},
		});
		expect(
			wrapper.find(`input[type="checkbox"][value="A"]:checked`).exists()
		).toBe(true);
		expect(
			wrapper.find(`input[type="checkbox"][value="B"]:checked`).exists()
		).toBe(true);
		expect(
			wrapper.find(`input[type="checkbox"][value="C"]:checked`).exists()
		).toBe(false);
	});

	it("can choose an option", async () => {
		const wrapper = mount(InputCheckbox, {
			propsData: {
				label: "Checkbox",
				value: [],
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
		selectedOption.setChecked(true);
		expect(wrapper.emitted("input")).toStrictEqual([[[expectedValue]]]);
	});

	it("can deselect an option", async () => {
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
		const options = wrapper.findAll(`input[type="checkbox"][value="A"]`);
		const selectedOption = options.at(0);
		selectedOption.setChecked(false);
		expect(wrapper.emitted("input")).toStrictEqual([[[]]]);
	});

	it("throws error if label in option is missing", () => {
		expect(() =>
			mount(InputCheckbox, {
				propsData: {
					options: [{ value: "A" }],
				},
			})
		).toThrow(new Error(`option 0 is missing a label`));
	});

	it("throws error if value in option is missing", () => {
		expect(() =>
			mount(InputCheckbox, {
				propsData: {
					options: [{ label: "Checkbox 1" }],
				},
			})
		).toThrow(new Error(`option 0 is missing a value`));
	});
});
