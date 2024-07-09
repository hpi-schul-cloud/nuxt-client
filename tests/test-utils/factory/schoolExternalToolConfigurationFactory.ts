import { SchoolExternalToolConfigurationStatus } from "@/store/external-tool/school-external-tool-configuration-status";
import { Factory } from "fishery";

export const schoolToolConfigurationStatusFactory =
	Factory.define<SchoolExternalToolConfigurationStatus>(() => {
		return {
			isOutdatedOnScopeContext: false,
			isOutdatedOnScopeSchool: false,
			isIncompleteOperationalOnScopeContext: false,
			isIncompleteOnScopeContext: false,
			isGloballyDeactivated: false,
		};
	});
