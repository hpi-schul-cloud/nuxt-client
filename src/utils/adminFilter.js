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
const getFilterLastname = (ctx) => ({
	title: ctx.$t("common.labels.lastName"),
	chipTemplate: `${ctx.$t("common.labels.lastName")} = %1`,
	filter: [
		{
			attribute: "lastName",
			operator: "=",
			label: ctx.$t("common.labels.complete.lastName"),
			input: InputDefault,
			attributes: {
				type: "text",
				placeholder: ctx.$t("utils.adminFilter.placeholder.complete.lastname"),
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
						.add(1, "day")
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

const getClassesNames = async (ctx, arr) => {
	const classes = await ctx.$store.dispatch("classes/find", {
		query: {
			$limit: 1000,
		},
	});
	classes.data
		.reduce((acc, kl) => [...new Set(acc.concat(kl.displayName))], [])
		.forEach((cl) => {
			arr.push({
				value: cl,
				label: cl,
			});
		});
};

export function studentFilter(ctx) {
	const classesFilteringOptions = [];
	getClassesNames(ctx, classesFilteringOptions);

	return [
		{
			title: ctx.$t("common.labels.registration"),
			chipTemplate: ([filteredStatus]) => {
				const status = filteredStatus.map((stat) => {
					if (stat === "ok") {
						return ctx.$t("pages.administration.students.legend.icon.success");
					} else if (stat === "parentsAgreed") {
						return ctx.$t(
							"utils.adminFilter.consent.label.parentsAgreementMissing"
						);
					} else if (stat === "missing") {
						return ctx.$t("utils.adminFilter.consent.label.missing");
					}
				});
				return ` ${status.join(" " + ctx.$t("common.words.and") + " ")}`;
			},
			filter: [
				{
					attribute: "consentStatus",
					operator: "includes",
					input: InputCheckbox,
					options: [
						{
							value: "ok",
							label: ctx.$t(
								"pages.administration.students.legend.icon.success"
							),
						},
						{
							value: "parentsAgreed",
							label: ctx.$t(
								"utils.adminFilter.consent.label.parentsAgreementMissing"
							),
						},
						{
							value: "missing",
							label: ctx.$t("utils.adminFilter.consent.label.missing"),
						},
					],
				},
			],
		},
		{
			title: ctx.$t("utils.adminFilter.class.title"),
			chipTemplate: `${ctx.$t("utils.adminFilter.class.title")} = %1`,
			filter: [
				{
					attribute: "classes",
					operator: "=",
					input: InputCheckbox,
					options: classesFilteringOptions,
				},
			],
		},
		getFilterFirstname(ctx),
		getFilterLastname(ctx),
		getFilterDateCreatedFromTo(ctx),
	];
}

export function teacherFilter(ctx) {
	const classesFilteringOptions = [];
	getClassesNames(ctx, classesFilteringOptions);

	return [
		{
			title: ctx.$t("utils.adminFilter.consent.title"),
			chipTemplate: ([filteredStatus]) => {
				const status = filteredStatus.map((stat) => {
					if (stat === "ok") {
						return ctx.$t("pages.administration.students.legend.icon.success");
					} else if (stat === "missing") {
						return ctx.$t("utils.adminFilter.consent.label.missing");
					}
				});
				return ` ${status.join(" " + ctx.$t("common.words.and") + " ")}`;
			},
			filter: [
				{
					attribute: "consentStatus",
					operator: "includes",
					input: InputCheckbox,
					options: [
						{
							value: "ok",
							label: ctx.$t(
								"pages.administration.students.legend.icon.success"
							),
						},
						{
							value: "missing",
							label: ctx.$t("utils.adminFilter.consent.label.missing"),
						},
					],
				},
			],
		},
		{
			title: ctx.$t("utils.adminFilter.class.title"),
			chipTemplate: `${ctx.$t("utils.adminFilter.class.title")} = %1`,
			filter: [
				{
					attribute: "classes",
					operator: "=",
					input: InputCheckbox,
					options: classesFilteringOptions,
				},
			],
		},
		getFilterFirstname(ctx),
		getFilterLastname(ctx),
		getFilterDateCreatedFromTo(ctx),
	];
}
