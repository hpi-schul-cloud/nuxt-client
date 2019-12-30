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

	it("has an aria-label", () => {
		const wrapper = mount(BaseSelect, {
			propsData: {
				label: "label",
				multiple: true,
				options: [],
				value: [],
			},
		});
		expect(wrapper.attributes()["aria-label"]).toEqual("label");
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

		[true, false].forEach((multiple) => {
			const wrapper = mount(BaseSelect, {
				propsData: {
					label: testLabel,
					optionLabel: "name",
					options: [testOption],
					multiple: multiple,
					value: [],
				},
			});
			const options = wrapper.findAll(".multiselect__option");
			expect(
				options.filter((w) => w.element.textContent === testOption.name).length
			).toBe(1);
		});
	});

	it("passes attributes to the multiselect input", () => {
		const options = [
			{
				name: "Donald Duck",
				value: "donald",
			},
		];
		const wrapper = shallowMount(BaseSelect, {
			propsData: {
				closeOnSelect: true,
				deselectLabel: "deselectLabel",
				label: "label",
				multiple: true,
				options: options,
				optionLabel: "optionLabel",
				placeholder: "placeholder",
				selectLabel: "selectLabel",
				selectedLabel: "selectedLabel",
				trackBy: "id",
				value: options,
			},
		});
		const multiSelect = wrapper.find("multi-select-stub");
		expect(multiSelect.attributes("closeonselect")).toBeTruthy();
		expect(multiSelect.attributes("deselectlabel")).toBe("deselectLabel");
		expect(multiSelect.attributes("multiple")).toBeTruthy();
		expect(multiSelect.attributes("label")).toBe("optionLabel");
		expect(multiSelect.props("options")).toEqual(options);
		expect(multiSelect.attributes("placeholder")).toBe("placeholder");
		expect(multiSelect.attributes("selectlabel")).toBe("selectLabel");
		expect(multiSelect.attributes("selectedlabel")).toBe("selectedLabel");
		expect(multiSelect.attributes("trackby")).toBe("id");
		expect(multiSelect.props("value")).toEqual(options);
	});

	it("emits events", () => {
		const wrapper = shallowMount(BaseSelect, {
			propsData: {
				label: "label",
				multiple: true,
				options: [],
				value: [],
			},
		});
		const multiSelect = wrapper.find("multi-select-stub");
		multiSelect.vm.$emit("select", "select");
		expect(wrapper.emitted().select).toEqual([["select"]]);
		multiSelect.vm.$emit("input", "input");
		expect(wrapper.emitted().input).toEqual([["input"]]);
		multiSelect.vm.$emit("search-change", "search-change");
		expect(wrapper.emitted()["search-change"]).toEqual([["search-change"]]);
		multiSelect.vm.$emit("tag", "tag");
		expect(wrapper.emitted().tag).toEqual([["tag"]]);
	});
});
