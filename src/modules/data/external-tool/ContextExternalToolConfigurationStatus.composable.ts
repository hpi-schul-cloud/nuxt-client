import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { ContextExternalToolConfigurationStatus } from "./types";

export const useContextExternalToolConfigurationStatus = () => {
	const authModule = injectStrict(AUTH_MODULE_KEY);

	const determineOutdatedTranslationKey = (
		toolConfigStatus: ContextExternalToolConfigurationStatus
	): string => {
		const userRoles = authModule.getUserRoles;

		if (userRoles.includes("teacher")) {
			if (
				toolConfigStatus.isOutdatedOnScopeContext &&
				toolConfigStatus.isOutdatedOnScopeSchool
			) {
				return "common.tool.information.outdatedOnSchoolAndContext.teacher";
			} else if (toolConfigStatus?.isOutdatedOnScopeSchool) {
				return "common.tool.information.outdatedOnSchool.teacher";
			} else {
				return "common.tool.information.outdatedOnContext.teacher";
			}
		} else {
			return "common.tool.information.outdated.student";
		}
	};

	const determineIncompleteTranslationKey = (): string => {
		const userRoles = authModule.getUserRoles;

		if (userRoles.includes("teacher")) {
			return "common.tool.information.incompleteOnContext.teacher";
		} else {
			return "common.tool.information.incomplete.student";
		}
	};

	return {
		determineOutdatedTranslationKey,
		determineIncompleteTranslationKey,
	};
};
