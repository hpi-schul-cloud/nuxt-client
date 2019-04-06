import BaseInput from "./BaseInput";

describe("@components/BaseInputRadio", () => {
	it(`Check if input type="radio" is rendered`, () => {
		const wrapper = mount(BaseInput, {
			propsData: {
				label: "Checkbox",
				name: "checkbox",
				type: "radio",
				value: "test",
				vmodel: "test",
			},
		});
		expect(wrapper.find("input[type='radio']").exists()).toBeTruthy();
	});

	it(`input updates v-model`, () => {
		const wrapper = mount({
			data: () => ({ value: "a" }),
			template: `<div>
				<base-input v-model="value" value="a" label="test" type="radio" name="radio" />
				<base-input v-model="value" value="b" label="test" type="radio" name="radio" />
			</div>`,
			components: { BaseInput },
		});

		const inputA = wrapper.find("input[value=a]");
		const inputB = wrapper.find("input[value=b]");
		expect(wrapper.vm.value).toBe("a");
		inputB.setChecked();
		expect(wrapper.vm.value).toBe("b");
		inputA.setChecked();
		expect(wrapper.vm.value).toBe("a");
	});

	it(`v-model updates input`, () => {
		const wrapper = mount({
			data: () => ({ value: "b" }),
			template: `<div>
				<base-input v-model="value" value="a" label="test" type="radio" name="radio" />
				<base-input v-model="value" value="b" label="test" type="radio" name="radio" />
			</div>`,
			components: { BaseInput },
		});

		expect(wrapper.find("input[value=b]:checked")).toBeTruthy();
		wrapper.setData({ value: "a" });
		expect(wrapper.find("input[value=a]:checked")).toBeTruthy();
		wrapper.setData({ value: "b" });
		expect(wrapper.find("input[value=b]:checked")).toBeTruthy();
	});
});
