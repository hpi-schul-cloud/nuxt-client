// import { layouts } from "vue-filter-ui";

import InputCheckbox from "@components/organisms/DataFilter/InputCheckbox";

export const studentFilter = [
	{
		title: "Einverständniserklärung",
		chipTemplate: ([filteredStatus]) => {
			const status = filteredStatus.map((stat) => {
				if (stat === "ok") {
					return "vollständig";
				} else if (stat === "parentsAgreed") {
					return "nur Eltern haben zugestimmt";
				} else if (stat === "missing") {
					return "nicht vorhanden";
				}
			});
			return `Zustimmung: ${status.join(" oder ")}`;
		},
		filter: [
			{
				attribute: "agreed",
				operator: "=",
				input: InputCheckbox,
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
	// {
	// 	title: "Vorname",
	// 	chipTemplate: "Vorname enthält %1",
	// 	filter: [
	// 		{
	// 			attribute: "firstName",
	// 			operator: "includes",
	// 			input: inputs.InputText,
	// 		},
	// 	],
	// },
	// {
	// 	title: "Nachname",
	// 	chipTemplate: "Nachname enthält %1",
	// 	filter: [
	// 		{
	// 			attribute: "lastName",
	// 			operator: "includes",
	// 			input: inputs.InputText,
	// 		},
	// 	],
	// },
	// {
	// 	title: "E-mail",
	// 	chipTemplate: "Email enthält %1",
	// 	filter: [
	// 		{
	// 			attribute: "email",
	// 			operator: "includes",
	// 			input: inputs.InputText,
	// 		},
	// 	],
	// },
	// {
	// 	title: "Erstellt am %1",
	// 	chipTemplate: "Erstellt am %1",
	// 	filter: [
	// 		{
	// 			attribute: "createdAt",
	// 			operator: "includes",
	// 			input: inputs.InputNumber,
	// 		},
	// 	],
	// },
];
