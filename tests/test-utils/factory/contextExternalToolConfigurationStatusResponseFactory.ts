import { Factory } from "fishery";
import { ContextExternalToolConfigurationStatusResponse } from "@/serverApi/v3";

export const contextExternalToolConfigurationStatusResponseFactory =
	Factory.define<ContextExternalToolConfigurationStatusResponse>(() => {
		return {
			isOutdatedOnScopeContext: false,
			isOutdatedOnScopeSchool: false,
			isIncompleteOnScopeContext: false,
			isIncompleteOperationalOnScopeContext: false,
			isDeactivated: false,
		};
	});
