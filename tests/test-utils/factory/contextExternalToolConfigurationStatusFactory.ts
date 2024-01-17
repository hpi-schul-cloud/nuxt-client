import { Factory } from "fishery";
import { ContextExternalToolConfigurationStatus } from "@/store/external-tool";

export const ContextExternalToolConfigurationStatusFactory =
	Factory.define<ContextExternalToolConfigurationStatus>(() => {
		return {
			isOutdatedOnScopeContext: false,
			isOutdatedOnScopeSchool: false,
			isIncompleteOnScopeContext: false,
			isDeactivated: false,
		};
	});
