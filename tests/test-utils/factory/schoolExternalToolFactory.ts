import { Factory } from "fishery";
import { SchoolExternalTool } from "@/store/external-tool";
import { schoolToolConfigurationStatusFactory } from "./schoolExternalToolConfigurationFactory";

export const schoolExternalToolFactory = Factory.define<SchoolExternalTool>(
	({ sequence }) => ({
		id: `schoolExternalTool${sequence}`,
		schoolId: "schoolId",
		toolId: "toolId",
		name: "name",
		parameters: [],
		status: schoolToolConfigurationStatusFactory.build(),
		version: 1,
		isDeactivated: false,
	})
);
