/* eslint-disable max-lines */

import BaseTable from "./BaseTable";
import data from "./data";
import columns from "./columns";

function getWrapper(attributes) {
	return mount(BaseTable, {
		propsData: {
			data: data,
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

		expect(
			wrapper
				.findAll("thead tr")
				.at(0)
				.findAll("th").length
		).toBe(4);

		expect(
			wrapper
				.findAll("tbody tr")
				.at(0)
				.contains("td")
		).toBe(true);

		expect(
			wrapper
				.findAll("thead tr")
				.at(0)
				.findAll("th")
				.at(0)
				.html()
				.includes("Vorname")
		).toBe(true);

		expect(
			wrapper
				.findAll("tbody tr")
				.at(0)
				.findAll("td")
				.at(0)
				.html()
				.includes("Hulk")
		).toBe(true);

		expect(
			wrapper
				.findAll("tbody tr")
				.at(0)
				.findAll("td")
				.at(2)
				.html()
				.includes("LA")
		).toBe(true);
	});

	it("The extra-column slot should add an extra column with access to the current row data", () => {
		var wrapper = mount({
			data: () => ({
				data,
				columns,
			}),
			template: `<div>
				<base-table v-slot:extra-column="slotProps" :data="data" :columns="columns">
					<span>{{ slotProps.row.firstName + ' ' +  slotProps.row.lastName }}</span>
				</base-table>
			</div>`,
			components: { BaseTable },
		});

		expect(wrapper.findAll("tbody tr").length).toBe(5);

		expect(
			wrapper
				.findAll("tbody tr")
				.at(0)
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
				.findAll("tbody tr")
				.at(0)
				.findAll("td")
				.at(0)
				.html()
				.includes("Hulk")
		).toBe(true);

		wrapper
			.findAll(".is-sortable")
			.at(0)
			.trigger("click");

		expect(
			wrapper
				.findAll("tbody tr")
				.at(0)
				.findAll("td")
				.at(0)
				.html()
				.includes("Armin")
		).toBe(true);
	});

	it("Should only sort sortable columns", () => {
		var wrapper = getWrapper();

		expect(
			wrapper
				.findAll("tbody tr")
				.at(0)
				.findAll("td")
				.at(0)
				.html()
				.includes("Hulk")
		).toBe(true);

		wrapper
			.findAll("th")
			.at(2)
			.trigger("click");

		expect(
			wrapper
				.findAll("tbody tr")
				.at(0)
				.findAll("td")
				.at(0)
				.html()
				.includes("Hulk")
		).toBe(true);
	});

	it("Should allow filtering the based on string properties", () => {
		var wrapper = getWrapper({ filterable: true });

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
		var wrapper = getWrapper({ filterable: true });

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
		var wrapper = getWrapper({ filterable: true });

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
		var wrapper = getWrapper({ filterable: true });

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

	it("Should allow selecting the rows", () => {
		var wrapper = getWrapper({ showRowSelection: true });

		wrapper
			.findAll("tbody tr")
			.at(0)
			.findAll("td")
			.at(0)
			.find('input[type="checkbox"]')
			.setChecked();

		expect(
			wrapper
				.findAll("tbody tr")
				.at(0)
				.classes()
		).toContain("checked");
	});

	it("Should select all rows", () => {
		var wrapper = getWrapper({ showRowSelection: true });

		wrapper
			.findAll("tbody tr")
			.at(0)
			.findAll("td")
			.at(0)
			.find('input[type="checkbox"]')
			.setChecked();

		expect(
			wrapper
				.findAll("tbody tr")
				.at(0)
				.classes()
		).toContain("checked");
	});

	it("Should select all rows and trigger an action", () => {
		var wrapper = mount({
			data: () => ({
				data,
				columns,
				actions: [
					{
						label: "Test",
						action: test,
					},
				],
			}),
			template: `<div>
				<base-table
					:data="data"
					:columns="columns"
					showRowSelection
					:actions="actions"
					ref="table"
				/>
			</div>`,
			components: { BaseTable },
		});

		wrapper
			.find("thead tr")
			.findAll("th")
			.at(0)
			.find('input[type="checkbox"]')
			.setChecked();

		expect(wrapper.vm.$refs.table.allRowsOfCurrentPageSelected).toBe(true);
		expect(wrapper.vm.$refs.table.newSelectedRows.length).toBe(5);

		wrapper
			.find("thead tr")
			.findAll("th")
			.at(0)
			.find('input[type="checkbox"]')
			.setChecked(false);

		expect(wrapper.vm.$refs.table.allRowsOfCurrentPageSelected).toBe(false);
		expect(wrapper.vm.$refs.table.newSelectedRows.length).toBe(0);

		expect(wrapper.vm.$refs.table.$refs.rowSelectionBar.actions.length).toBe(1);
	});

	it("Should allow data from a backend", () => {});
});
