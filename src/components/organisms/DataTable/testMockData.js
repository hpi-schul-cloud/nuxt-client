module.exports = {
	columns: [
		{
			field: "firstName",
			label: "Vorname",
			sortable: true,
		},
		{
			field: "lastName",
			label: "Nachname",
			sortable: true,
		},
		{
			field: "address.city",
			label: "Stadt",
		},
		{
			field: "age",
			label: "Alter",
		},
	],
	data: [
		{
			address: {
				city: "LA",
			},
			age: 54,
			birthday: "1990-01-02",
			firstName: "Hulk",
			id: "1",
			lastName: "Hogan",
		},
		{
			address: {
				city: "Nintendo 64",
			},
			age: 999,
			birthday: "1990-01-03",
			firstName: "Mario",
			id: "2",
			lastName: "Super",
		},
		{
			address: {
				city: "Nintendo 64",
			},
			age: 999,
			birthday: "2001-01-03",
			firstName: "Luigi",
			id: "3",
			lastName: "Super",
		},
		{
			address: {
				city: "Nintendo 64",
			},
			age: 999,
			birthday: "1992-01-02",
			firstName: "Armin",
			id: "4",
			lastName: "Mann",
		},
		{
			address: {
				city: "Nintendo 64",
			},
			age: 999,
			birthday: "1990-03-01",
			firstName: "Mario",
			id: "5",
			lastName: "Super",
		},
	],
};
