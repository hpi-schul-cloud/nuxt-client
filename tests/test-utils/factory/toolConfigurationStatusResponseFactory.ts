import { Factory } from "fishery";
import { ToolConfigurationStatusResponse } from "@/serverApi/v3";

export const toolConfigurationStatusResponseFactory =
	Factory.define<ToolConfigurationStatusResponse>(() => {
		return {
			isOutdatedOnScopeContext: false,
			isOutdatedOnScopeSchool: false,
		};
	});
