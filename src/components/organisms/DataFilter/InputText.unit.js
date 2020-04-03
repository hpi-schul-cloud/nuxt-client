import InputText from "./InputText";
describe("@components/organisms/DataFilter/InputText", () => {
	it("sets Input Value correctly", async () => {
		const wrapper = mount(InputText, {
			propsData: {
				label: "Name",
				value: "",
				options: [{ value: "", label: "Name", placeholder: "Filtern.." }],
			},
		});
		const Input = wrapper.findAll(`input[type="text"]`);
		expect(Input.exists()).toBe(true);
		Input.setValue("Anna");
		expect(wrapper.emitted("input")).toStrictEqual([["Anna"]]);
	});

	it("throws error if label in option is missing", () => {
		expect(() =>
			mount(InputText, {
				propsData: {
					options: [{ value: "10" }],
				},
			})
		).toThrow(new Error(`option 0 is missing a label`));
	});
});
