import BaseSelect from "./BaseSelect";

describe("@components/BaseSelect", () => {
	it(...isValidComponent(BaseSelect));

	it("render component", () => {
		const testLabel = "test";
		const wrapper = mount(BaseSelect, {
			stubs: {
				"multi-select": true,
			},
			propsData: {
				value: [
					{
						name: "Donald",
						id: "donald",
					},
					{
						name: "Kim",
						id: "kim",
					},
				],
				options: [
					{
						name: "Donald",
						value: "donald",
					},
					{
						name: "Kim",
						value: "kim",
					},
					{
						name: "Gerhard",
						value: "gerhard",
					},
				],
				optionLabel: "name",
				label: testLabel,
			},
		});
		expect(wrapper.find("multi-select-stub").exists()).toBe(true);
	});

	it("uses default option label", () => {
		const testLabel = "test";
		const testOption = {
			label: "Donald Duck",
			value: "donald",
		};
		const wrapperProps = {
			value: [],
			options: [testOption],
			label: testLabel,
		};

		[true, false].forEach((multiple) => {
			const wrapper = mount({
				data: () => wrapperProps,
				template: `<base-select v-model="value" label="${testLabel}" :options="options" :multiple="${multiple}" />`,
				components: { BaseSelect },
			});
			const options = wrapper.findAll(".multiselect__option");
			expect(
				options.filter((w) => w.element.textContent === testOption.label).length
			).toBe(1);
		});
	});

	it("uses custom option label", () => {
		const testLabel = "test";
		const testOption = {
			name: "Donald Duck",
			value: "donald",
		};
		const wrapperProps = {
			value: [],
			options: [testOption],
			label: testLabel,
		};

		[true, false].forEach((multiple) => {
			const wrapper = mount({
				data: () => wrapperProps,
				template: `<base-select v-model="value" label="${testLabel}" optionLabel="name" :options="options" :multiple="${multiple}" />`,
				components: { BaseSelect },
			});
			const options = wrapper.findAll(".multiselect__option");
			expect(
				options.filter((w) => w.element.textContent === testOption.name).length
			).toBe(1);
		});
	});
});
