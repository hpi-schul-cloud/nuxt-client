import { Factory } from "fishery";
import { SchoolExternalToolConfigurationStatus } from "@/store/external-tool/school-external-tool-configuration-status";

export const schoolToolConfigurationStatusFactory =
	Factory.define<SchoolExternalToolConfigurationStatus>(() => {
		return {
			isOutdatedOnScopeContext: false,
			isOutdatedOnScopeSchool: false,
			isIncompleteOperationalOnScopeContext: false,
			isIncompleteOnScopeContext: false,
			isDeactivated: false,
		};
	});
