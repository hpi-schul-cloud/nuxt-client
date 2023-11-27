import { Factory } from "fishery";
import { ToolConfigurationStatusResponse } from "@/serverApi/v3";

export const toolConfigurationStatusResponseFactory =
	Factory.define<ToolConfigurationStatusResponse>(() => {
		return {
			isDisabled: false,
			isOutdatedOnScopeContext: false,
			isOutdatedOnScopeSchool: false,
		};
	});
