import { Factory } from "fishery";
import { SchoolExternalTool } from "@/store/external-tool";
import { toolConfigurationStatusFactory } from "./toolConfigurationSatusFactory";

export const schoolExternalToolFactory = Factory.define<SchoolExternalTool>(
	({ sequence }) => ({
		id: `schoolExternalTool${sequence}`,
		schoolId: "schoolId",
		toolId: "toolId",
		name: "name",
		parameters: [],
		status: toolConfigurationStatusFactory.build(),
		version: 1,
	})
);
