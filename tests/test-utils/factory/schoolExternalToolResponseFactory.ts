import { SchoolExternalToolResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { schoolExternalToolConfigurationStatusResponseFactory } from "./schoolExternalToolConfigurationStatusResponseFactory";

export const schoolExternalToolResponseFactory =
	Factory.define<SchoolExternalToolResponse>(({ sequence }) => ({
		id: `school-external-tool-${sequence}`,
		schoolId: `school-${sequence}`,
		toolId: `tool-${sequence}`,
		name: `SchoolExternalTool${sequence}`,
		status: schoolExternalToolConfigurationStatusResponseFactory.build(),
		parameters: [],
	}));
