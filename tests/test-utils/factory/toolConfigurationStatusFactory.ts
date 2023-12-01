import { Factory } from "fishery";
import { ToolConfigurationStatus } from "@/store/external-tool";

export const toolConfigurationStatusFactory =
	Factory.define<ToolConfigurationStatus>(() => {
		return {
			isOutdatedOnScopeContext: false,
			isOutdatedOnScopeSchool: false,
		};
	});
