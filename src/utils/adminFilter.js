import InputCheckbox from "@components/organisms/DataFilter/InputCheckbox";
import DataFilterInput from "@components/organisms/DataFilter/DataFilterInput";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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
	{
		title: "Vorname",
		chipTemplate: "Vorname enthält %1",
		filter: [
			{
				attribute: "firstName",
				operator: "includes",

				label: "Vorname",
				input: DataFilterInput,
				attributes: {
					type: "text",
					placeholder: "Nach Name filtern...",
				},
			},
		],
	},
	{
		title: "Erstellt am",
		chipTemplate: (filter) => {
			return `Erstellt zwischen ${dayjs(filter[0]).format(
				"DD.MM.YYYY"
			)} und ${dayjs(filter[1]).format("DD.MM.YYYY")} `;
		},
		parser: {
			generator: (filterGroupConfig, values) => {
				const UTCFormat = "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]";
				return {
					createdAt: {
						$gte: dayjs(values[filterGroupConfig.filter[0].id])
							.utc()
							.format(UTCFormat),
						$lte: dayjs(values[filterGroupConfig.filter[1].id])
							.utc()
							.format(UTCFormat),
					},
				};
			},
			parser: (filterGroupConfig, query) => {
				return {
					[filterGroupConfig.filter[0].id]: query?.createdAt?.$gte,
					[filterGroupConfig.filter[1].id]: query?.createdAt?.$lte,
				};
			},
		},
		filter: [
			{
				attribute: "createdAt",
				input: DataFilterInput,
				label: "Erstellungsdatum von",
				attributes: {
					type: "date",
					placeholder: "Erstellungsdatum filtern",
				},
			},
			{
				attribute: "createdAt",
				input: DataFilterInput,
				label: "Erstellungsdatum bis",
				attributes: {
					type: "date",
					placeholder: "Erstellungsdatum filtern",
				},
			},
		],
	},
];
