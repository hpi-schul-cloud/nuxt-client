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
		expect(wrapper.find("input[type='radio']").exists()).toBe(true);
	});

	it(`input updates v-model`, async () => {
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
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.value).toBe("b");
		inputA.setChecked();
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.value).toBe("a");
	});

	it(`v-model updates input`, async () => {
		const wrapper = mount({
			data: () => ({ value: "b" }),
			template: `<div>
				<base-input v-model="value" value="a" label="test" type="radio" name="radio" />
				<base-input v-model="value" value="b" label="test" type="radio" name="radio" />
			</div>`,
			components: { BaseInput },
		});

		expect(wrapper.find("input[value=b]:checked").exists()).toBe(true);
		wrapper.setData({ value: "a" });
		await wrapper.vm.$nextTick();
		expect(wrapper.find("input[value=a]:checked").exists()).toBe(true);
		wrapper.setData({ value: "b" });
		await wrapper.vm.$nextTick();
		expect(wrapper.find("input[value=b]:checked").exists()).toBe(true);
	});
});
