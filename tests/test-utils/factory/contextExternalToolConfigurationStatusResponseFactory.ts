import { ContextExternalToolConfigurationStatusResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const contextExternalToolConfigurationStatusResponseFactory =
	Factory.define<ContextExternalToolConfigurationStatusResponse>(() => {
		return {
			isOutdatedOnScopeContext: false,
			isOutdatedOnScopeSchool: false,
			isIncompleteOnScopeContext: false,
			isIncompleteOperationalOnScopeContext: false,
			isDeactivated: false,
			isNotLicensed: false,
		};
	});
