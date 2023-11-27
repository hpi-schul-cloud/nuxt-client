import { Factory } from "fishery";
import { ToolConfigurationStatus } from "@/store/external-tool";

export const toolConfigurationStatusFactory =
	Factory.define<ToolConfigurationStatus>(() => {
		return {
			isDisabled: false,
			isOutdatedOnScopeContext: false,
			isOutdatedOnScopeSchool: false,
		};
	});
