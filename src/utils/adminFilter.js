import InputCheckbox from "@components/organisms/DataFilter/inputs/Checkbox";
import InputDefault from "@components/organisms/DataFilter/inputs/Default";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const getFilterFirstname = (ctx) => ({
	title: ctx.$t("common.labels.firstName"),
	chipTemplate: `${ctx.$t("common.labels.firstName")} = %1`,
	filter: [
		{
			attribute: "firstName",
			operator: "=",
			label: ctx.$t("common.labels.complete.firstName"),
			input: InputDefault,
			attributes: {
				type: "text",
				placeholder: ctx.$t("utils.adminFilter.placeholder.complete.name"),
			},
		},
	],
});

const getFilterDateCreatedFromTo = (ctx) => ({
	title: ctx.$t("utils.adminFilter.date.title"),
	chipTemplate: (filter) => {
		return `${ctx.$t("utils.adminFilter.date.created")} ${dayjs(
			filter[0]
		).format("DD.MM.YYYY")} ${ctx.$t("common.words.and")} ${dayjs(
			filter[1]
		).format("DD.MM.YYYY")} `;
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
			input: InputDefault,
			label: ctx.$t("utils.adminFilter.date.label.from"),
			attributes: {
				type: "date",
				placeholder: ctx.$t("utils.adminFilter.placeholder.date.from"),
			},
		},
		{
			attribute: "createdAt",
			input: InputDefault,
			label: ctx.$t("utils.adminFilter.date.label.until"),
			attributes: {
				type: "date",
				placeholder: ctx.$t("utils.adminFilter.placeholder.date.until"),
			},
		},
	],
});

export function studentFilter(ctx) {
	return [
		{
			title: ctx.$t("utils.adminFilter.consent.title"),
			chipTemplate: ([filteredStatus]) => {
				const status = filteredStatus.map((stat) => {
					if (stat === "ok") {
						return ctx.$t("utils.adminFilter.consent.ok");
					} else if (stat === "parentsAgreed") {
						return ctx.$t("utils.adminFilter.consent.parentsAgreed");
					} else if (stat === "missing") {
						return ctx.$t("utils.adminFilter.consent.missing");
					}
				});
				return `${ctx.$t("utils.adminFilter.consent")} ${status.join(
					" " + ctx.$t("common.words.and") + " "
				)}`;
			},
			filter: [
				{
					attribute: "agreed",
					operator: "=",
					input: InputCheckbox,
					options: [
						{
							value: "ok",
							label: ctx.$t("utils.adminFilter.consent.label.ok"),
						},
						{
							value: "parentsAgreed",
							label: ctx.$t("utils.adminFilter.consent.label.parentsAgreed"),
						},
						{
							value: "missing",
							label: ctx.$t("utils.adminFilter.consent.label.missing"),
						},
					],
				},
			],
		},
		getFilterFirstname(ctx),
		getFilterDateCreatedFromTo(ctx),
	];
}

export function teacherFilter(ctx) {
	return [
		{
			title: ctx.$t("utils.adminFilter.teacher.consent.title"),
			chipTemplate: ([filteredStatus]) => {
				const status = filteredStatus.map((stat) => {
					if (stat === "ok") {
						return ctx.$t("utils.adminFilter.teacher.consent.ok");
					} else if (stat === "missing") {
						return ctx.$t("utils.adminFilter.consent.missing");
					}
				});
				return `${ctx.$t("utils.adminFilter.consent")} ${status.join(
					" " + ctx.$t("common.words.and") + " "
				)}`;
			},
			filter: [
				{
					attribute: "agreed",
					operator: "=",
					input: InputCheckbox,
					options: [
						{
							value: "ok",
							label: ctx.$t("utils.adminFilter.teacher.consent.label.ok"),
						},
						{
							value: "missing",
							label: ctx.$t("utils.adminFilter.teacher.consent.label.missing"),
						},
					],
				},
			],
		},
		getFilterFirstname(ctx),
		getFilterDateCreatedFromTo(ctx),
	];
}
