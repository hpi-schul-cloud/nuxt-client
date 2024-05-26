import { ContextExternalToolConfigurationStatus } from "@data-external-tool";
import { Factory } from "fishery";

export const contextExternalToolConfigurationStatusFactory =
	Factory.define<ContextExternalToolConfigurationStatus>(() => {
		return {
			isOutdatedOnScopeContext: false,
			isOutdatedOnScopeSchool: false,
			isIncompleteOnScopeContext: false,
			isIncompleteOperationalOnScopeContext: false,
			isDeactivated: false,
			isNotLicensed: false,
		};
	});
