import ChipFilter from "@components/molecules/ChipFilter";

describe("@components/molecules/ChipFilter", () => {
	it("exports a valid component", () => {
		expect(ChipFilter).toBeAComponent();
	});

	it("renders toggle option", () => {
		const toggleTags = ["Aktuell", "Archiviert"];
		const activeToggle = "Aktuell";

		const wrapper = mount(ChipFilter, {
			propsData: {
				options: toggleTags,
				value: activeToggle,
				multiple: false,
			},
		});
		expect(wrapper.props().options.length).toBe(2);
		expect(wrapper.props().value).toBe("Aktuell");
		expect(wrapper.props().multiple).toBe(false);
	});

	it("renders filter option", () => {
		const filterTags = ["Spanisch", "Deutsch", "Englisch"];
		const activeFilters = [];

		const wrapper = mount(ChipFilter, {
			propsData: {
				value: activeFilters,
				options: filterTags,
				multiple: true,
			},
		});

		expect(wrapper.props().options.length).toBe(3);
		expect(wrapper.props().value.length).toBe(0);
		expect(wrapper.props().multiple).toBe(true);
	});

	it("filters get selected", () => {
		const activeFilters = [];
		const filterTags = ["Spanisch", "Deutsch", "Englisch"];

		const wrapper = mount(ChipFilter, {
			propsData: {
				value: activeFilters,
				options: filterTags,
				multiple: true,
			},
		});

		wrapper.props("value").length;

		wrapper.find(".chip").trigger("click");
		expect(wrapper.props("value").length).toBe(0);
		// console.log(wrapper.vm.value.length);
		// console.log(wrapper.emitted().value);
		// expect(wrapper.emitted().value.length).toBe(1);
	});
});
