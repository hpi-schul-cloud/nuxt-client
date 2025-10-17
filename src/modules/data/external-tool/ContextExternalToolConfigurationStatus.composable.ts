import { ContextExternalToolConfigurationStatus } from "./types";
import { RoleName } from "@/serverApi/v3";
import { useAppStore } from "@data-app";
import { useI18n } from "vue-i18n";

export const useContextExternalToolConfigurationStatus = () => {
	const { t } = useI18n();

	const determineToolStatusTranslationKey = (toolConfigStatus: ContextExternalToolConfigurationStatus): string => {
		const userRoles = useAppStore().userRoles;

		if (userRoles.includes(RoleName.Teacher)) {
			if (toolConfigStatus.isOutdatedOnScopeSchool && toolConfigStatus.isOutdatedOnScopeContext) {
				return "common.tool.information.incomplete.outdated.schoolAndContext.teacher";
			} else if (toolConfigStatus.isOutdatedOnScopeSchool) {
				return "common.tool.information.outdatedOnSchool.teacher";
			} else if (
				toolConfigStatus.isOutdatedOnScopeContext ||
				toolConfigStatus.isIncompleteOperationalOnScopeContext ||
				toolConfigStatus.isIncompleteOnScopeContext
			) {
				return "common.tool.information.outdated.teacher";
			} else {
				return "";
			}
		} else {
			return "common.tool.information.outdated.student";
		}
	};

	const determineMediaBoardElementStatusMessage = (
		toolConfigStatus: ContextExternalToolConfigurationStatus
	): string => {
		let statusString: string;
		const userRoles = useAppStore().userRoles;

		if (toolConfigStatus.isDeactivated) {
			statusString = t("common.medium.alert.deactivated") + " ";
		} else if (toolConfigStatus.isNotLicensed) {
			statusString = t("common.medium.alert.notLicensed") + " ";
		} else {
			statusString = t("common.medium.alert.incomplete") + " ";
		}

		if (userRoles.includes(RoleName.Administrator)) {
			return statusString + t("common.medium.information.admin");
		} else if (userRoles.includes(RoleName.Teacher)) {
			return statusString + t("common.medium.information.teacher");
		} else {
			return statusString + t("common.medium.information.student");
		}
	};

	const determineDeactivatedTranslationKey = (): string => {
		const userRoles = useAppStore().userRoles;

		if (userRoles.includes(RoleName.Student)) {
			return "common.tool.information.deactivated.student";
		} else {
			return "common.tool.information.deactivated.teacher";
		}
	};

	const determineNotLicensedTranslationKey = (): string => {
		const userRoles = useAppStore().userRoles;

		if (userRoles.includes(RoleName.Student)) {
			return "common.tool.information.notLicensed.student";
		} else {
			return "common.tool.information.notLicensed.teacher";
		}
	};

	const isOperational = (toolConfigStatus: ContextExternalToolConfigurationStatus): boolean => {
		if (
			toolConfigStatus.isIncompleteOnScopeContext ||
			toolConfigStatus.isOutdatedOnScopeContext ||
			toolConfigStatus.isOutdatedOnScopeSchool ||
			toolConfigStatus.isDeactivated ||
			toolConfigStatus.isNotLicensed
		) {
			return false;
		}
		return true;
	};

	const isTeacher = () => useAppStore().userRoles.includes(RoleName.Teacher);

	return {
		determineToolStatusTranslationKey,
		determineMediaBoardElementStatusMessage,
		determineDeactivatedTranslationKey,
		determineNotLicensedTranslationKey,
		isTeacher,
		isOperational,
	};
};
