import { SchoolExternalToolResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { schoolToolConfigurationStatusResponseFactory } from "./schoolExternalToolConfigurationStatusFactory";

export const schoolExternalToolResponseFactory =
	Factory.define<SchoolExternalToolResponse>(({ sequence }) => ({
		id: `school-external-tool-${sequence}`,
		schoolId: `school-${sequence}`,
		toolId: `tool-${sequence}`,
		name: `SchoolExternalTool${sequence}`,
		status: schoolToolConfigurationStatusResponseFactory.build(),
		parameters: [],
		toolVersion: 1,
	}));
