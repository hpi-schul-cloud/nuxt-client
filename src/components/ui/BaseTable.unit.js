import BaseTable from "./BaseTable";

const data = [
	{
		firstName: "Hulk",
		lastName: "Hogan",
		address: {
			city: "LA",
		},
		age: 54,
	},
	{
		firstName: "Mario",
		lastName: "Super",
		address: {
			city: "Nintendo 64",
		},
		age: 999,
	},
];

const columns = [
	{
		field: "firstName",
		label: "Vorname",
	},
	{
		field: "lastName",
		label: "Nachname",
	},
	{
		field: "address.city",
		label: "Stadt",
	},
	{
		field: "age",
		label: "Alter",
	},
];

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

		expect(wrapper.findAll("tbody tr").length).toBe(2);

		expect(
			wrapper
				.findAll("thead tr")
				.at(0)
				.findAll("td").length
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
				.findAll("td")
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

	it("The default slot should add an extra column with access to the current row data", () => {
		var wrapper = mount({
			data: () => ({
				data,
				columns,
			}),
			template: `<div>
				<base-table v-slot:default="slotProps" :data="data" :columns="columns">
					<span>{{ slotProps.row.firstName + ' ' +  slotProps.row.lastName }}</span>
				</base-table>
			</div>`,
			components: { BaseTable },
		});

		expect(wrapper.findAll("tbody tr").length).toBe(2);

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
});
