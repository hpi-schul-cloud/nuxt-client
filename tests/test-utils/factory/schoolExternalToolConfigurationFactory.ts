import { Factory } from "fishery";
import { SchoolToolConfigurationStatus } from "@/store/external-tool/school-external-tool-configuration-status";

export const schoolToolConfigurationStatusFactory =
	Factory.define<SchoolToolConfigurationStatus>(() => {
		return {
			isOutdatedOnScopeContext: false,
			isOutdatedOnScopeSchool: false,
		};
	});
