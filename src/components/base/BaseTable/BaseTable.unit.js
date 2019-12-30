/* eslint-disable max-lines */

import BaseTable from "./BaseTable";
import data from "./data";
import columns from "./columns";

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

	it("Should allow filtering the based on string properties", () => {
		var wrapper = getShallowWrapper({ filterable: true });

		var newFiltersSelected = [
			{
				label: "Vorname",
				type: "string",
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
				type: "string",
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
				type: "string",
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
		var wrapper = getShallowWrapper({ filterable: true });

		expect(wrapper.vm.newFiltersSelected).toEqual([]);

		const newFilters = [{
			label: "Alter",
			type: "number",
			property: "age",
			matchingType: {
				value: "equals",
				label: "ist gleich",
			},
			value: "999",
		}]

		wrapper.setProps({ filtersSelected: newFilters });
		expect(wrapper.vm.newFiltersSelected).toEqual(newFilters);

	});

	it("allows to select and unselect a row", () => {
		var wrapper = getWrapper({ showRowSelection: true });
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

	it("Should allow data from a backend", () => {});
});
