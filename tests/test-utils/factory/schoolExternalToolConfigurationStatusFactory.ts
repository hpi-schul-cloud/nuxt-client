import { Factory } from "fishery";
import { SchoolToolConfigurationStatusResponse } from "@/serverApi/v3";

export const schoolToolConfigurationStatusResponseFactory =
	Factory.define<SchoolToolConfigurationStatusResponse>(() => {
		return {
			isOutdatedOnScopeSchool: false,
		};
	});
