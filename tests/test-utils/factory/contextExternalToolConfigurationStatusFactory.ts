import { ContextExternalToolConfigurationStatus } from "@data-external-tool";
import { Factory } from "fishery";

export const ContextExternalToolConfigurationStatusFactory =
	Factory.define<ContextExternalToolConfigurationStatus>(() => {
		return {
			isOutdatedOnScopeContext: false,
			isOutdatedOnScopeSchool: false,
			isIncompleteOnScopeContext: false,
			isDeactivated: false,
		};
	});
