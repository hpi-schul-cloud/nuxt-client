import { ContextExternalToolConfigurationStatus } from "@/store/external-tool";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";

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

	return {
		determineOutdatedTranslationKey,
	};
};
