import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { ContextExternalToolConfigurationStatus } from "./types";

export const useContextExternalToolConfigurationStatus = () => {
	const authModule = injectStrict(AUTH_MODULE_KEY);

	const determineChipStatusTitle = (
		toolConfigStatus: ContextExternalToolConfigurationStatus
	): string | undefined => {
		const userRoles = authModule.getUserRoles;
		if (
			toolConfigStatus.isOutdatedOnScopeContext ||
			toolConfigStatus.isIncompleteOnScopeContext ||
			toolConfigStatus.isOutdatedOnScopeSchool
		) {
			return "pages.rooms.tools.outdated";
		}

		if (
			userRoles.includes("teacher") &&
			toolConfigStatus.isIncompleteOperationalOnScopeContext
		) {
			return "pages.rooms.tools.outdated";
		}
	};

	const determineToolStatusTranslationKey = (
		toolConfigStatus: ContextExternalToolConfigurationStatus
	): string => {
		const userRoles = authModule.getUserRoles;

		if (userRoles.includes("teacher")) {
			if (
				toolConfigStatus.isOutdatedOnScopeSchool &&
				toolConfigStatus.isOutdatedOnScopeContext
			) {
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
			return "common.tool.information.outdatedOrIncomplete.student";
		}
	};

	const determineDeactivatedMessage = (): string => {
		const userRoles = authModule.getUserRoles;
		if (userRoles.includes("student")) {
			return "common.tool.information.deactivated.student";
		} else {
			return "common.tool.information.deactivated.teacher";
		}
	};

	return {
		determineChipStatusTitle,
		determineToolStatusTranslationKey,
		determineDeactivatedMessage,
	};
};
