import ChipFilter from "@components/molecules/ChipFilter";

describe("@components/molecules/ChipFilter", () => {
	it(...isValidComponent(ChipFilter));

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
		expect(wrapper.props().options.length).toBe(toggleTags.length);
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

		expect(wrapper.props().options.length).toBe(filterTags.length);
		expect(wrapper.props().value.length).toBe(0);
		expect(wrapper.props().multiple).toBe(true);
	});

	it("filtertTag gets selected if there was no selection before", () => {
		const activeFilters = [];
		const filterTags = ["Spanisch", "Deutsch", "Englisch"];

		const wrapper = mount(ChipFilter, {
			propsData: {
				value: activeFilters,
				options: filterTags,
				multiple: true,
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find(".chip").trigger("click"));
		const firstEvent = wrapper.emitted("update:value")[0][0];
		expect(firstEvent.length).toBe(1);
	});

	it("filter chips wont get rendered if filter tags are epmty", () => {
		const activeFilters = [];
		const filterTags = [];

		const wrapper = mount(ChipFilter, {
			propsData: {
				value: activeFilters,
				options: filterTags,
				multiple: true,
			},
		});

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find(".chip").exists()).toBe(false);
	});

	it("filtertTag gets removed", () => {
		const activeFilters = ["Spanisch", "Deutsch", "Englisch"];
		const filterTags = ["Spanisch", "Deutsch", "Englisch"];

		const wrapper = mount(ChipFilter, {
			propsData: {
				value: activeFilters,
				options: filterTags,
				multiple: true,
			},
		});

		const testChip = wrapper.find(".chip");
		const chipText = testChip.text();
		expect(testChip.trigger("click"));
		const newSelection = wrapper.emitted("update:value")[0][0];
		expect(newSelection.length).toBe(2);
		expect(newSelection.every((chip) => !chip.includes(chipText)));
	});

	it("filtertTag gets selected and existing ones are kept", () => {
		const activeFilters = ["Englisch", "Deutsch"];
		const filterTags = ["Spanisch", "Deutsch", "Englisch"];

		const wrapper = mount(ChipFilter, {
			propsData: {
				value: activeFilters,
				options: filterTags,
				multiple: true,
			},
		});

		const testChip = wrapper.find(".chip");
		const chipText = testChip.text();
		expect(testChip.trigger("click"));
		const newSelection = wrapper.emitted("update:value")[0][0];
		expect(newSelection.length).toBe(3);
		expect(newSelection.every((chip) => !chip.includes(chipText)));
	});
});
