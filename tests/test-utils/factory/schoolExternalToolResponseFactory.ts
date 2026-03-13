import { schoolExternalToolConfigurationStatusResponseFactory } from "./schoolExternalToolConfigurationStatusResponseFactory";
import { SchoolExternalToolResponse } from "@api-server";
import { Factory } from "fishery";

export const schoolExternalToolResponseFactory = Factory.define<SchoolExternalToolResponse>(({ sequence }) => ({
	id: `school-external-tool-${sequence}`,
	schoolId: `school-${sequence}`,
	toolId: `tool-${sequence}`,
	name: `SchoolExternalTool${sequence}`,
	isDeactivated: false,
	status: schoolExternalToolConfigurationStatusResponseFactory.build(),
	parameters: [],
}));
