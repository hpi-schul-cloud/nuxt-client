/* eslint-disable max-lines */

import BaseTable from "./BaseTable";
import data from "./testdata";
import columns from "./columns";
import filters from "./testfilters";
import MultiSelect from "vue-multiselect";
import FlatPickr from "vue-flatpickr-component";
const _ = require("lodash");

import { supportedFilterTypes } from "@mixins/defaultFilters";
import { supportedFilterMatchingTypes } from "@mixins/defaultFilters";

function getWrapper(attributes) {
	return mount(BaseTable, {
		propsData: {
			data: data,
			trackBy: "id",
			columns: columns,
			...attributes,
		},
	});
}

function getTestFilters() {
	return _.cloneDeep(filters);
}

function getShallowWrapper(attributes) {
	return shallowMount(BaseTable, {
		propsData: {
			data: data,
			trackBy: "id",
			columns: columns,
			...attributes,
		},
	});
}

function openFilterModal(wrapper, filter) {
	const filterMenu = wrapper.find(MultiSelect);
	const selectedFilter = filter || filterMenu.vm.options[0];

	const tags = wrapper.findAll(".multiselect__tag span");
	if (tags.exists()) {
		const tag = tags.filter((t) => t.text().includes(selectedFilter.label));
		// option is already selected
		if (tag.exists()) {
			return tag.trigger("mousedown");
		}
	}
	return filterMenu.vm.select(selectedFilter);
}

function closeFilterModal(wrapper) {
	const modalWrapper = wrapper.find(".base-modal-wrapper");
	if (modalWrapper) {
		modalWrapper.trigger("click");
	}
}

function selectMatchingType(wrapper, type) {
	const matchingTypeSelection = wrapper.find(".modal-body").find(MultiSelect);
	const newMatchingType = matchingTypeSelection.vm.options.find(
		(matchingtype) => matchingtype.value === type
	);
	matchingTypeSelection.vm.select(newMatchingType);
}

function submitFilterModal(wrapper) {
	const filterModalButton = wrapper.find(".modal-footer button");
	filterModalButton.trigger("click");
}

describe("@components/BaseTable", () => {
	it(...isValidComponent(BaseTable));

	it("Passing the columns and data should render the table. Nested properties should be possible.", () => {
		var wrapper = getWrapper();

		expect(wrapper.findAll("tbody tr").length).toBe(5);
		expect(wrapper.find("thead tr").findAll("th").length).toBe(4);
		expect(wrapper.find("tbody tr").contains("td")).toBe(true);

		expect(
			wrapper
				.find("thead tr th")
				.html()
				.includes("Vorname")
		).toBe(true);

		expect(
			wrapper
				.find("tbody tr td")
				.html()
				.includes("Hulk")
		).toBe(true);

		expect(
			wrapper
				.find("tbody tr")
				.findAll("td")
				.at(2)
				.html()
				.includes("LA")
		).toBe(true);
	});

	it("The extra-column slot should add an extra column with access to the current row data", () => {
		var wrapper = mount({
			data: () => ({
				columns,
				data,
			}),
			template: `<div>
				<base-table v-slot:extra-column="slotProps" :data="data" :columns="columns" track-by="id">
					<span>{{ slotProps.row.firstName + ' ' +  slotProps.row.lastName }}</span>
				</base-table>
			</div>`,
			components: { BaseTable },
		});

		expect(wrapper.findAll("tbody tr").length).toBe(5);

		expect(
			wrapper
				.find("tbody tr")
				.findAll("td")
				.at(4)
				.html()
				.includes("Hulk Hogan")
		).toBe(true);
	});

	it("Should allow pagination", () => {
		var wrapper = mount({
			data: () => ({
				data,
				columns,
				currentPage: 1,
				rowsPerPage: 3,
			}),
			template: `<base-table
					:data="data"
					:columns="columns"
					:rows-per-page.sync="rowsPerPage"
					:current-page.sync="currentPage"
					track-by="id"
					paginated
				/>`,
			components: { BaseTable },
		});

		expect(wrapper.findAll("tbody tr").length).toBe(3);

		wrapper
			.findAll(".pagination-link-wrapper a")
			.at(1)
			.trigger("click");

		expect(wrapper.findAll("tbody tr").length).toBe(2);
	});

	it("Should sort the data", () => {
		var wrapper = getWrapper();

		expect(
			wrapper
				.find("tbody tr td")
				.html()
				.includes("Hulk")
		).toBe(true);

		wrapper
			.findAll(".is-sortable")
			.at(0)
			.trigger("click");

		expect(
			wrapper
				.find("tbody tr td")
				.html()
				.includes("Armin")
		).toBe(true);
	});

	it("Should only sort sortable columns", () => {
		var wrapper = getWrapper();

		expect(
			wrapper
				.find("tbody tr td")
				.html()
				.includes("Hulk")
		).toBe(true);

		wrapper
			.findAll("th")
			.at(2)
			.trigger("click");

		expect(
			wrapper
				.find("tbody tr td")
				.html()
				.includes("Hulk")
		).toBe(true);
	});

	it("Should allow filtering the rows based on string properties", () => {
		var wrapper = getShallowWrapper({ filterable: true });

		var newFiltersSelected = [
			{
				label: "Vorname",
				type: "text",
				property: "firstName",
				matchingType: {
					value: "contains",
					label: "enthält",
				},
				value: "Mar",
			},
		];
		wrapper.setData({ newFiltersSelected: newFiltersSelected });

		expect(wrapper.text()).toContain("Mario");
		expect(wrapper.text()).not.toContain("Hulk");

		var newFiltersSelected = [
			{
				label: "Vorname",
				type: "text",
				property: "firstName",
				matchingType: {
					value: "equals",
					label: "ist gleich",
				},
				value: "Mario",
			},
		];
		wrapper.setData({ newFiltersSelected: newFiltersSelected });

		expect(wrapper.text()).toContain("Mario");
		expect(wrapper.text()).not.toContain("Hulk");
	});

	it("Should allow filtering the based on numeric properties", () => {
		var wrapper = getShallowWrapper({ filterable: true });

		var newFiltersSelected = [
			{
				label: "Alter",
				type: "number",
				property: "age",
				matchingType: {
					value: "equals",
					label: "ist gleich",
				},
				value: "999",
			},
		];
		wrapper.setData({ newFiltersSelected: newFiltersSelected });

		expect(wrapper.text()).toContain("Mario");
		expect(wrapper.text()).not.toContain("Hulk");
	});

	it("Should allow filtering the based on multiple options", () => {
		var wrapper = getShallowWrapper({ filterable: true });

		var newFiltersSelected = [
			{
				label: "Vorname",
				type: "select",
				property: "firstName",
				value: [
					{
						checked: true,
						value: "Mario",
						label: "Mario",
					},
				],
			},
		];
		wrapper.setData({ newFiltersSelected: newFiltersSelected });

		expect(wrapper.text()).toContain("Mario");
		expect(wrapper.text()).not.toContain("Hulk");
	});

	it("Should allow filtering with custom filter implementation", () => {
		var wrapper = getShallowWrapper({ filterable: true });

		var newFiltersSelected = [
			{
				label: "Vorname",
				type: "text",
				property: "firstName",
				value: "Mario",
				matchingType: {
					implementation: (value, targetValue) => value < targetValue,
					label: "ist kleiner",
				},
			},
		];
		wrapper.setData({ newFiltersSelected: newFiltersSelected });

		expect(wrapper.text()).toContain("Hulk");
		expect(wrapper.text()).not.toContain("Mario");
	});

	it("updates its filters when filtersSelected property is changed", () => {
		const wrapper = getShallowWrapper({ filterable: true });

		expect(wrapper.vm.newFiltersSelected).toEqual([]);

		const newFilters = [
			{
				label: "Alter",
				type: "number",
				property: "age",
				matchingType: {
					value: "equals",
					label: "ist gleich",
				},
				value: "999",
			},
		];

		wrapper.setProps({ filtersSelected: newFilters });
		expect(wrapper.vm.newFiltersSelected).toEqual(newFilters);
	});

	it("allows to set filters", () => {
		supportedFilterTypes.forEach((filterType) => {
			const filter = getTestFilters().find((f) => f.type === filterType);
			const wrapper = getWrapper({
				showRowSelection: true,
				filterable: true,
				filters: [filter],
			});

			openFilterModal(wrapper);
			submitFilterModal(wrapper);
			expect(wrapper.vm.newFiltersSelected[0].value).toEqual(filter.value);
			expect(wrapper.emitted()["update:filters-selected"].length).toBe(1);
			let expectedTagLabel;
			if (["number", "text"].includes(filter.type)) {
				expectedTagLabel = `${filter.label} ${filter.matchingType.label} ${filter.value}`;
			} else if (filter.type === "date") {
				const dateString = new Date(filter.value).toLocaleDateString("de-DE", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				});
				expectedTagLabel = `${filter.label} ${filter.matchingType.label} ${dateString}`;
			} else if (filter.type === "fulltextSearch") {
				expectedTagLabel = `Volltextsuche nach: ${filter.value}`;
			} else if (filter.type === "select") {
				expectedTagLabel = `${filter.label}: ${filter.value[0].value}`;
			}
			expect(wrapper.emitted()["update:filters-selected"][0]).toEqual([
				[
					{
						...filter,
						tagLabel: expectedTagLabel,
					},
				],
			]);
		});
	});

	it("allows to remove filters", () => {
		supportedFilterTypes.forEach((filterType) => {
			const filter = getTestFilters().find((f) => f.type === filterType);
			const wrapper = getWrapper({
				showRowSelection: true,
				filterable: true,
				filters: [filter],
			});
			openFilterModal(wrapper);
			submitFilterModal(wrapper);

			wrapper.find(".multiselect__tag-icon").trigger("mousedown");

			expect(wrapper.emitted()["update:filters-selected"].length).toBe(2);
			expect(wrapper.emitted()["update:filters-selected"][1]).toEqual([[]]);

			openFilterModal(wrapper);
			submitFilterModal(wrapper);

			// remove Filter via Multiselect-Menu
			const filterMenu = wrapper.find(MultiSelect);
			filterMenu.vm.select(filter);

			expect(wrapper.emitted()["update:filters-selected"].length).toBe(4);
			expect(wrapper.emitted()["update:filters-selected"][1]).toEqual([[]]);
		});
	});

	it("allows to select matching type of filters", () => {
		supportedFilterTypes.forEach((filterType) => {
			const filter = getTestFilters().find((f) => f.type === filterType);
			const wrapper = getWrapper({
				showRowSelection: true,
				filterable: true,
				filters: [filter],
			});
			if (supportedFilterMatchingTypes[filterType]) {
				Object.values(supportedFilterMatchingTypes[filterType]).forEach(
					(matchingType, index) => {
						openFilterModal(wrapper);
						selectMatchingType(wrapper, matchingType.value);
						submitFilterModal(wrapper);
						expect(wrapper.vm.newFiltersSelected[0].matchingType.value).toEqual(
							matchingType.value
						);
						expect(wrapper.vm.newFiltersSelected[0].matchingType.label).toEqual(
							matchingType.label
						);
						expect(wrapper.emitted()["update:filters-selected"].length).toBe(
							index + 1
						);
						let expectedFilterValue = filter.value;
						if (filter.type === "date") {
							expectedFilterValue = new Date(filter.value).toLocaleDateString(
								"de-DE",
								{
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
								}
							);
						}
						expect(wrapper.emitted()["update:filters-selected"][index]).toEqual(
							[
								[
									{
										...filter,
										matchingType,
										tagLabel: `${filter.label} ${matchingType.label} ${expectedFilterValue}`,
									},
								],
							]
						);
					}
				);
			}
		});
	});

	it("allows to open and close the FilterModal several times", () => {
		supportedFilterTypes.forEach((filterType) => {
			const filter = getTestFilters().find((f) => f.type === filterType);
			const wrapper = getWrapper({
				showRowSelection: true,
				filterable: true,
				filters: [filter],
			});
			openFilterModal(wrapper);
			expect(wrapper.find(".modal-container").exists()).toBe(true);
			closeFilterModal(wrapper);
			expect(wrapper.find(".modal-container").exists()).toBe(false);
			openFilterModal(wrapper);
			expect(wrapper.find(".modal-container").exists()).toBe(true);
		});
	});

	it("allows to modify filter values", async () => {
		supportedFilterTypes.forEach((filterType) => {
			const filter = getTestFilters().find((f) => f.type === filterType);
			const wrapper = getWrapper({
				showRowSelection: true,
				filterable: true,
				filters: [filter],
			});

			const newFilterValues = {
				date: "2020-01-02",
				fulltextSearch: "newSearchString",
				number: 10,
				select: "Mario",
				text: "newFilterValue",
			};

			const newFilterValue = newFilterValues[filter.type];

			if (supportedFilterMatchingTypes[filterType]) {
				Object.values(supportedFilterMatchingTypes[filterType]).forEach(
					(matchingType, index) => {
						openFilterModal(wrapper);
						selectMatchingType(wrapper, matchingType.value);

						let expectedFilterValue;
						if (filterType === "date") {
							const flatPickr = wrapper.find(FlatPickr);
							flatPickr.setProps({ value: "2020-01-02" });
							flatPickr.vm.$emit("input", newFilterValue);
							expectedFilterValue = new Date(
								newFilterValue
							).toLocaleDateString("de-DE", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric",
							});
						} else {
							const filterModalInput = wrapper.find(
								".modal-body .input-line input"
							);
							filterModalInput.setValue(newFilterValue);
							expectedFilterValue = newFilterValue;
						}

						submitFilterModal(wrapper);

						expect(wrapper.vm.newFiltersSelected[0].value).toEqual(
							newFilterValue
						);
						expect(wrapper.emitted()["update:filters-selected"].length).toBe(
							index + 1
						);
						expect(wrapper.emitted()["update:filters-selected"][index]).toEqual(
							[
								[
									{
										...filter,
										matchingType,
										value: newFilterValue,
										tagLabel: `${filter.label} ${matchingType.label} ${expectedFilterValue}`,
									},
								],
							]
						);
						const tag = wrapper.find(".multiselect__tag span");
						expect(tag.text()).toEqual(
							`${filter.label} ${matchingType.label} ${expectedFilterValue}`
						);
					}
				);
			} else {
				if (filter.type === "fulltextSearch") {
					const multiSelectInput = wrapper.find(".multiselect__input");
					multiSelectInput.setValue(newFilterValue);
					multiSelectInput.trigger("keypress.enter");
					expect(wrapper.vm.newFiltersSelected[0].value).toEqual(
						newFilterValue
					);
					expect(wrapper.emitted()["update:filters-selected"].length).toBe(1);
					expect(wrapper.emitted()["update:filters-selected"][0]).toEqual([
						[
							{
								...filter,
								value: newFilterValue,
								tagLabel: `Volltextsuche nach: ${newFilterValue}`,
							},
						],
					]);
					const tag = wrapper.find(".multiselect__tag span");
					expect(tag.text()).toEqual(`Volltextsuche nach: ${newFilterValue}`);
				}
				if (filter.type === "select") {
					const filterValue = filter.value.filter(
						(f) => f.value === newFilterValue
					);
					filterValue.checked = false;
					openFilterModal(wrapper);

					const checkbox = wrapper.find(".modal-body input[type='checkbox']");
					checkbox.setChecked();

					submitFilterModal(wrapper);
					expect(wrapper.vm.newFiltersSelected[0].value[0].checked).toEqual(
						true
					);
					expect(wrapper.emitted()["update:filters-selected"].length).toBe(1);
					expect(wrapper.emitted()["update:filters-selected"][0]).toEqual([
						[
							{
								...filter,
								value: [
									{
										...filter.value[0],
										value: newFilterValue,
										checked: true,
									},
								],
								tagLabel: `${filter.label}: ${newFilterValue}`,
							},
						],
					]);
					const tag = wrapper.find(".multiselect__tag span");
					expect(tag.text()).toEqual(`${filter.label}: ${newFilterValue}`);
				}
			}
		});
	});

	it("allows to combine several filters", () => {
		const testFilters = getTestFilters();
		const wrapper = getWrapper({
			showRowSelection: true,
			filterable: true,
			filters: testFilters,
		});

		openFilterModal(wrapper, testFilters[0]);
		submitFilterModal(wrapper);
		openFilterModal(wrapper, testFilters[1]);
		submitFilterModal(wrapper);

		expect(wrapper.emitted()["update:filters-selected"].length).toBe(2);
	});

	it("allows to select and unselect a row", () => {
		const wrapper = getWrapper({ showRowSelection: true });
		const rowSelection = wrapper.find("tbody tr td input[type='checkbox']");

		rowSelection.setChecked();

		expect(wrapper.find("tbody tr").classes()).toContain("selected");
		expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(false);
		expect(wrapper.emitted()["update:selected-rows"][0]).toEqual([[data[0]]]);

		rowSelection.setChecked(false);

		expect(wrapper.find("tbody tr").classes()).not.toContain("selected");
		expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(false);
		expect(wrapper.emitted()["update:selected-rows"][1]).toEqual([[]]);
	});

	it("allows to select and unselect all rows of current page", () => {
		const wrapper = getWrapper({
			showRowSelection: true,
			paginated: true,
			rowsPerPage: 2,
		});
		const allRowsSelection = wrapper.find("thead tr th input[type='checkbox']");

		allRowsSelection.setChecked();
		expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);

		expect(wrapper.emitted()["update:selected-rows"].length).toBe(1);
		expect(wrapper.emitted()["update:selected-rows"][0]).toEqual([
			data.slice(0, 2),
		]);

		expect(wrapper.emitted()["all-rows-of-current-page-selected"].length).toBe(
			1
		);
		expect(wrapper.emitted()["all-rows-of-current-page-selected"][0]).toEqual([
			data.slice(0, 2),
		]);

		allRowsSelection.setChecked(false);
		expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(false);

		expect(wrapper.emitted()["update:selected-rows"].length).toBe(2);
		expect(wrapper.emitted()["update:selected-rows"][1]).toEqual([[]]);

		expect(wrapper.emitted()["all-rows-of-current-page-selected"].length).toBe(
			2
		);
		expect(wrapper.emitted()["all-rows-of-current-page-selected"][1]).toEqual([
			[],
		]);
	});

	it("allows to select and unselect all rows of current page manually", () => {
		const wrapper = getWrapper({
			showRowSelection: true,
			paginated: true,
			rowsPerPage: 2,
		});

		wrapper.findAll("tbody tr td input[type='checkbox']").setChecked();

		expect(
			wrapper
				.findAll("tbody tr")
				.wrappers.every((tr) => tr.classes().includes("selected"))
		).toBe(true);
		expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);

		wrapper.findAll("tbody tr td input[type='checkbox']").setChecked(false);
		expect(
			wrapper
				.findAll("tbody tr")
				.wrappers.some((tr) => tr.classes().includes("selected"))
		).toBe(false);
		expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(false);
	});

	it("allows to select all rows of all pages", () => {
		const wrapper = getWrapper({
			showRowSelection: true,
			paginated: true,
			rowsPerPage: 2,
		});
		const allRowsSelection = wrapper.find("thead tr th input[type='checkbox']");

		allRowsSelection.setChecked();
		expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);
		const allRowsOfAllPagesSelection = wrapper.find(".select-all-rows");
		expect(allRowsOfAllPagesSelection.exists()).toBe(true);
		allRowsOfAllPagesSelection.trigger("click");

		expect(wrapper.vm.allRowsOfAllPagesSelected).toBe(true);

		expect(wrapper.emitted()["update:selected-rows"].length).toBe(2);
		expect(wrapper.emitted()["update:selected-rows"][1]).toEqual([data]);

		expect(wrapper.emitted()["all-rows-selected"].length).toBe(1);
		expect(wrapper.emitted()["all-rows-selected"][0]).toEqual([data]);
	});

	it("can trigger an action on selected rows", () => {
		const testAction = jest.fn();
		var wrapper = getWrapper({
			showRowSelection: true,
			actions: [
				{
					label: "Test",
					action: testAction,
				},
			],
		});

		wrapper.find("thead tr th input[type='checkbox']").setChecked();
		wrapper.find(".dropdown li").trigger("click");
		expect(testAction).toHaveBeenCalled();

		expect(wrapper.emitted()["update:selected-rows"].length).toBe(2);
		expect(wrapper.emitted()["update:selected-rows"][1]).toEqual([[]]);

		expect(wrapper.emitted()["all-rows-selected"].length).toBe(1);
		expect(wrapper.emitted()["all-rows-selected"][0]).toEqual([[]]);
	});

	it("does not change row selection when new rows are added", () => {
		var wrapper = getWrapper({
			showRowSelection: true,
			paginated: true,
			rowsPerPage: 2,
		});

		wrapper.findAll("tbody tr td input[type='checkbox']").setChecked();
		expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);

		wrapper.setProps({
			data: [
				...data,
				{
					id: "6",
					firstName: "Test",
					lastName: "Test",
					address: {
						city: "Test",
					},
					age: 999,
				},
			],
		});

		expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);
	});

	it("does not change row selection during navigation between different pages", () => {
		var wrapper = getWrapper({
			showRowSelection: true,
			paginated: true,
			rowsPerPage: 2,
		});

		wrapper.findAll("tbody tr td input[type='checkbox']").setChecked();
		expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);

		wrapper.setProps({ currentPage: 2 });
		expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(false);

		wrapper.setProps({ currentPage: 1 });
		expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);
	});

	it("updates its row selection when selectedRows property is changed", () => {
		var wrapper = getShallowWrapper({ showRowSelection: true });

		expect(
			wrapper
				.findAll("tbody tr")
				.wrappers.some((tr) => tr.classes().includes("selected"))
		).toBe(false);

		wrapper.setProps({ selectedRows: [data[0]] });
		expect(wrapper.find("tbody tr").classes()).toContain("selected");
	});

	it("paginates its rows", () => {
		var wrapper = getWrapper({ paginated: true, rowsPerPage: 2 });
		expect(wrapper.vm.visibleRows.length).toBe(2);

		wrapper.setProps({ rowsPerPage: 3 });
		expect(wrapper.vm.visibleRows.length).toBe(3);
	});

	it("passes computed value to total prop of subcomponents when backend pagination is disabled", () => {
		var wrapper = getShallowWrapper();
		expect(wrapper.find("row-selection-bar-stub").props("total")).toBe(
			data.length
		);
		expect(wrapper.find("pagination-stub").props("total")).toBe(data.length);
	});
});
