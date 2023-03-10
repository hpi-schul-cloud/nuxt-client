import { authModule } from "@/store";
import InputCheckbox from "@/components/organisms/DataFilter/inputs/Checkbox";
import InputDefault from "@/components/organisms/DataFilter/inputs/Default";

import { fromInputDateTime, printDate } from "@/plugins/datetime";

const defaultFilterFromDate = "1900-01-01";
const defaultFilterToDate = "2099-12-31";

const getFilterDateCreatedFromTo = (ctx) => ({
	title: ctx.$t("utils.adminFilter.date.title"),
	chipTemplate: (filter) => {
		return `${ctx.$t("utils.adminFilter.date.created")} ${printDate(
			filter[0] || defaultFilterFromDate
		)} ${ctx.$t("common.words.and")} ${printDate(
			filter[1] || defaultFilterToDate
		)} `;
	},
	dataTestid: "filter_creationDate",
	parser: {
		generator: (filterGroupConfig, values) => {
			try {
				return {
					createdAt: {
						$gte: fromInputDateTime(
							values[filterGroupConfig.filter[0].id] || defaultFilterFromDate
						)
							.utc()
							.format(),
						$lte: fromInputDateTime(
							values[filterGroupConfig.filter[1].id] || defaultFilterToDate
						)
							.endOf("day")
							.utc()
							.format(),
					},
				};
			} catch (error) {
				console.warn(error);
				return;
			}
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
				placeholder: ctx.$t("format.dateUTC"), //placeholder for browsers which do not support input type=date
			},
		},
		{
			attribute: "createdAt",
			input: InputDefault,
			label: ctx.$t("utils.adminFilter.date.label.until"),
			attributes: {
				type: "date",
				placeholder: ctx.$t("format.dateUTC"), //placeholder for browsers which do not support input type=date
			},
		},
	],
});

const getFilterDateOutdatedSinceFromTo = (ctx) => ({
	title: ctx.$t("utils.adminFilter.outdatedSince.title"),
	chipTemplate: (filter) => {
		return `${ctx.$t("utils.adminFilter.outdatedSince.title")} ${printDate(
			filter[0] || defaultFilterFromDate
		)} ${ctx.$t("common.words.and")} ${printDate(
			filter[1] || defaultFilterToDate
		)} `;
	},
	dataTestid: "filter_outdatedSinceDate",
	parser: {
		generator: (filterGroupConfig, values) => {
			try {
				return {
					outdatedSince: {
						$gte: fromInputDateTime(
							values[filterGroupConfig.filter[0].id] || defaultFilterFromDate
						)
							.utc()
							.format(),
						$lte: fromInputDateTime(
							values[filterGroupConfig.filter[1].id] || defaultFilterToDate
						)
							.endOf("day")
							.utc()
							.format(),
					},
				};
			} catch (error) {
				console.warn(error);
				return;
			}
		},
		parser: (filterGroupConfig, query) => {
			return {
				[filterGroupConfig.filter[0].id]: query?.outdatedSince?.$gte,
				[filterGroupConfig.filter[1].id]: query?.outdatedSince?.$lte,
			};
		},
	},
	filter: [
		{
			attribute: "outdatedSince",
			input: InputDefault,
			label: ctx.$t("utils.adminFilter.outdatedSince.label.from"),
			attributes: {
				type: "date",
				placeholder: ctx.$t("format.dateUTC"), //placeholder for browsers which do not support input type=date
			},
		},
		{
			attribute: "outdatedSince",
			input: InputDefault,
			label: ctx.$t("utils.adminFilter.outdatedSince.label.until"),
			attributes: {
				type: "date",
				placeholder: ctx.$t("format.dateUTC"), //placeholder for browsers which do not support input type=date
			},
		},
	],
});

const getFilterDateLastMigrationSinceFromTo = (ctx) => ({
	title: ctx.$t("utils.adminFilter.lastMigration.title"),
	chipTemplate: (filter) => {
		return `${ctx.$t("utils.adminFilter.lastMigration.title")} ${printDate(
			filter[0] || defaultFilterFromDate
		)} ${ctx.$t("common.words.and")} ${printDate(
			filter[1] || defaultFilterToDate
		)} `;
	},
	dataTestid: "filter_lastMigrationDate",
	parser: {
		generator: (filterGroupConfig, values) => {
			try {
				return {
					lastLoginSystemChange: {
						$gte: fromInputDateTime(
							values[filterGroupConfig.filter[0].id] || defaultFilterFromDate
						)
							.utc()
							.format(),
						$lte: fromInputDateTime(
							values[filterGroupConfig.filter[1].id] || defaultFilterToDate
						)
							.endOf("day")
							.utc()
							.format(),
					},
				};
			} catch (error) {
				console.warn(error);
				return;
			}
		},
		parser: (filterGroupConfig, query) => {
			return {
				[filterGroupConfig.filter[0].id]: query?.lastLoginSystemChange?.$gte,
				[filterGroupConfig.filter[1].id]: query?.lastLoginSystemChange?.$lte,
			};
		},
	},
	filter: [
		{
			attribute: "lastLoginSystemChange",
			input: InputDefault,
			label: ctx.$t("utils.adminFilter.lastMigration.label.from"),
			attributes: {
				type: "date",
				placeholder: ctx.$t("format.dateUTC"), //placeholder for browsers which do not support input type=date
			},
		},
		{
			attribute: "lastLoginSystemChange",
			input: InputDefault,
			label: ctx.$t("utils.adminFilter.lastMigration.label.until"),
			attributes: {
				type: "date",
				placeholder: ctx.$t("format.dateUTC"), //placeholder for browsers which do not support input type=date
			},
		},
	],
});

const getClassesNames = async (ctx, arr) => {
	const { currentYear } = authModule.getSchool;
	await ctx.$store.dispatch("classes/find", {
		query: {
			$limit: 1000,
			year: currentYear,
		},
	});
	const classes = ctx.$store.state["classes"].list || [];
	classes
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
			dataTestid: "filter_registration",
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
			dataTestid: "filter_classes",
			filter: [
				{
					attribute: "classes",
					operator: "=",
					input: InputCheckbox,
					options: classesFilteringOptions,
				},
			],
		},
		getFilterDateCreatedFromTo(ctx),
		getFilterDateLastMigrationSinceFromTo(ctx),
		getFilterDateOutdatedSinceFromTo(ctx),
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
			dataTestid: "filter_registration",
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
			dataTestid: "filter_classes",
			filter: [
				{
					attribute: "classes",
					operator: "=",
					input: InputCheckbox,
					options: classesFilteringOptions,
				},
			],
		},
		getFilterDateCreatedFromTo(ctx),
		getFilterDateLastMigrationSinceFromTo(ctx),
		getFilterDateOutdatedSinceFromTo(ctx),
	];
}
