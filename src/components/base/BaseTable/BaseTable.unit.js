import BaseTable from "./BaseTable";
import data from "./data";
import columns from "./columns";

describe("@components/BaseTable", () => {
	it(...isValidComponent(BaseTable));

	it("Passing the columns and data should render the table. Nested properties should be possible.", () => {
		var wrapper = mount({
			data: () => ({
				data,
				columns,
			}),
			template: '<div><base-table :data="data" :columns="columns" /></div>',
			components: { BaseTable },
		});

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
				perPage: 3,
			}),
			template: `<div>
				<base-table
					:data="data"
					:columns="columns"
					:per-page.sync="perPage"
					:current-page.sync="currentPage"
					paginated
				/>
			</div>`,
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
		var wrapper = mount({
			data: () => ({
				data,
				columns,
			}),
			template: `<div>
				<base-table
					:data="data"
					:columns="columns"
				/>
			</div>`,
			components: { BaseTable },
		});

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

	it("Should allow checking the rows", () => {
		var wrapper = mount({
			data: () => ({
				data,
				columns,
			}),
			template: `<div>
				<base-table
					:data="data"
					:columns="columns"
					checkable
				/>
			</div>`,
			components: { BaseTable },
		});

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

	it("Should check all rows", () => {
		var wrapper = mount({
			data: () => ({
				data,
				columns,
			}),
			template: `<div>
				<base-table
					:data="data"
					:columns="columns"
					checkable
				/>
			</div>`,
			components: { BaseTable },
		});

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

	it("Should check all entries and trigger an action", () => {
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
					checkable
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

		expect(wrapper.vm.$refs.table.isAllChecked).toBe(true);
		expect(wrapper.vm.$refs.table.newCheckedRows.length).toBe(5);

		wrapper
			.find("thead tr")
			.findAll("th")
			.at(0)
			.find('input[type="checkbox"]')
			.setChecked(false);

		expect(wrapper.vm.$refs.table.isAllChecked).toBe(false);
		expect(wrapper.vm.$refs.table.newCheckedRows.length).toBe(0);

		expect(wrapper.vm.$refs.table.$refs.toolbelt.actions.length).toBe(1);
	});

	it("Should allow data from a backend", () => {});
});
