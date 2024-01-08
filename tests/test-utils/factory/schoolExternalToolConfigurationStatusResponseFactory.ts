import { Factory } from "fishery";
import { SchoolExternalToolConfigurationStatusResponse } from "@/serverApi/v3";

export const schoolExternalToolConfigurationStatusResponseFactory =
	Factory.define<SchoolExternalToolConfigurationStatusResponse>(() => {
		return {
			isOutdatedOnScopeSchool: false,
			isDeactivated: false,
		};
	});
