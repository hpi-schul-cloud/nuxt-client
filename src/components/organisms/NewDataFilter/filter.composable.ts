import { createSharedComposable } from "@vueuse/core";
// import { ref } from "vue";
import {
	FilterOptions,
	RegistrationTypes,
	SelectOptionsType,
} from "./types/filterTypes";
import { useI18n } from "vue-i18n";

const dataTableFilter = () => {
	const { t } = useI18n();

	const defaultFilterMenuItems: SelectOptionsType[] = [
		{
			title: t("common.labels.registration"),
			value: FilterOptions.REGISTRATION,
		},
		{ title: t("utils.adminFilter.class.title"), value: FilterOptions.CLASSES },
		{
			title: t("utils.adminFilter.date.title"),
			value: FilterOptions.CREATION_DATE,
		},
		{
			title: t("utils.adminFilter.lastMigration.title"),
			value: FilterOptions.LAST_MIGRATION_ON,
		},
		{
			title: t("utils.adminFilter.outdatedSince.title"),
			value: FilterOptions.OBSOLOTE_SINCE,
		},
	];

	const registrationOptions = [
		{
			title: t("pages.administration.students.legend.icon.success"),
			value: RegistrationTypes.COMPLETE,
		},
		{
			title: t("utils.adminFilter.consent.label.parentsAgreementMissing"),
			value: RegistrationTypes.PARENT_AGREED,
		},
		{
			title: t("utils.adminFilter.consent.label.missing"),
			value: RegistrationTypes.MISSING,
		},
	];
	return { defaultFilterMenuItems, registrationOptions };
};

export const useDataTableFilter = createSharedComposable(dataTableFilter);
