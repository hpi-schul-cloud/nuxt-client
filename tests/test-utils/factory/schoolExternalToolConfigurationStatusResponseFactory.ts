import { SchoolExternalToolConfigurationStatusResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const schoolExternalToolConfigurationStatusResponseFactory =
	Factory.define<SchoolExternalToolConfigurationStatusResponse>(() => {
		return {
			isOutdatedOnScopeSchool: false,
			isGloballyDeactivated: false,
		};
	});
