import BaseSelect from "./BaseSelect";
import MultiSelect from "vue-multiselect";

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

	it("has an aria-label ", () => {
		const wrapper = mount(BaseSelect, {
			propsData: {
				label: "label",
				multiple: true,
				options: [],
				value: [],
			},
		});
		expect(wrapper.find(MultiSelect).attributes()["aria-label"]).toStrictEqual(
			"label"
		);
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
				options.filter((w) => w.element.textContent === testOption.label)
			).toHaveLength(1);
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
				options.filter((w) => w.element.textContent === testOption.name)
			).toHaveLength(1);
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
		expect(multiSelect.attributes("closeonselect")).toBe("true");
		expect(multiSelect.attributes("deselectlabel")).toBe("deselectLabel");
		expect(multiSelect.attributes("multiple")).toBe("true");
		expect(multiSelect.attributes("label")).toBe("optionLabel");
		expect(multiSelect.props("options")).toStrictEqual(options); // TODO: this doesn't seem testing anything except the render method
		expect(multiSelect.attributes("placeholder")).toBe("placeholder");
		expect(multiSelect.attributes("selectlabel")).toBe("selectLabel");
		expect(multiSelect.attributes("selectedlabel")).toBe("selectedLabel");
		expect(multiSelect.attributes("trackby")).toBe("id");
		expect(multiSelect.props("value")).toStrictEqual(options); // TODO: this doesn't seem testing anything except the render method
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
		expect(wrapper.emitted().select).toStrictEqual([["select"]]);
		multiSelect.vm.$emit("input", "input");
		expect(wrapper.emitted().input).toStrictEqual([["input"]]);
		multiSelect.vm.$emit("search-change", "search-change");
		expect(wrapper.emitted()["search-change"]).toStrictEqual([
			["search-change"],
		]);
		multiSelect.vm.$emit("tag", "tag");
		expect(wrapper.emitted().tag).toStrictEqual([["tag"]]);
	});
});
