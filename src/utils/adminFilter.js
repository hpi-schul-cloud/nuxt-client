import { inputs, layouts } from "vue-filter-ui";
export const studentFilter = [
	{
		title: "Einträge pro Seite",
		chipTemplate: "Items per page: %1",
		required: true,
		layout: layouts.Default,
		filter: [
			{
				attribute: "$limit",
				operator: "<",
				input: inputs.Radio,
				options: [
					{ value: 25, label: "25" },
					{ value: 50, label: "50" },
					{ value: 100, label: "100" },
				],
			},
		],
	},
	{
		title: "Einverständniserklärung",
		chipTemplate: "Zustimmung: %1",
		filter: [
			{
				attribute: "agreed",
				operator: "=",
				input: inputs.Radio,
				options: [
					{ value: "ok", label: "Alle Einverständniserklärungen vorhanden" },
					{ value: "parentsAgreed", label: "Eltern haben zugestimmt" },
					{
						value: "missing",
						label: "Keine Einverständniserklärungen vorhanden",
					},
				],
			},
		],
	},
	{
		title: "Vorname",
		chipTemplate: "Vorname enthält %1",
		filter: [
			{
				attribute: "firstName",
				operator: "includes",
				input: inputs.InputText,
			},
		],
	},
	{
		title: "Nachname",
		chipTemplate: "Nachname enthält %1",
		filter: [
			{
				attribute: "lastName",
				operator: "includes",
				input: inputs.InputText,
			},
		],
	},
	{
		title: "E-mail",
		chipTemplate: "Email enthält %1",
		filter: [
			{
				attribute: "email",
				operator: "includes",
				input: inputs.InputText,
			},
		],
	},
	{
		title: "Erstellt am %1",
		chipTemplate: "Erstellt am %1",
		filter: [
			{
				attribute: "createdAt",
				operator: "includes",
				input: inputs.InputNumber,
			},
		],
	},
];
