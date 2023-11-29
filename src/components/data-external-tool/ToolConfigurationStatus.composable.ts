import { ToolConfigurationStatus } from "@/store/external-tool";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";

export const useToolConfigurationStatus = () => {
	const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);

	const determineOutdatedTranslationKey = (
		toolConfigStatus: ToolConfigurationStatus | undefined
	): string => {
		const userRoles = authModule.getUserRoles;

		if (userRoles.includes("teacher")) {
			if (
				toolConfigStatus?.isOutdatedOnScopeContext &&
				toolConfigStatus.isOutdatedOnScopeSchool
			) {
				return "common.information.outdatedOnSchoolAndContext.teacher";
			} else if (toolConfigStatus?.isOutdatedOnScopeSchool) {
				return "common.information.outdatedOnSchool.teacher";
			} else {
				return "common.information.outdatedOnContext.teacher";
			}
		} else {
			return "common.information.outdated.student";
		}
	};

	return {
		determineOutdatedTranslationKey,
	};
};
