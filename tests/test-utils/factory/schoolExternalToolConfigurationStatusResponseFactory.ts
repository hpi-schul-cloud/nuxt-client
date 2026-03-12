import { SchoolExternalToolConfigurationStatusResponse } from "@api-server";
import { Factory } from "fishery";

export const schoolExternalToolConfigurationStatusResponseFactory =
	Factory.define<SchoolExternalToolConfigurationStatusResponse>(() => {
		return {
			isOutdatedOnScopeSchool: false,
			isGloballyDeactivated: false,
		};
	});
