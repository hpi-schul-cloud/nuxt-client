import { SchoolExternalToolConfigurationStatus } from "@data-external-tool";
import { Factory } from "fishery";

export const schoolToolConfigurationStatusFactory = Factory.define<SchoolExternalToolConfigurationStatus>(() => ({
	isOutdatedOnScopeSchool: false,
	isGloballyDeactivated: false,
}));
