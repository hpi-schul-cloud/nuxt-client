import { Factory } from "fishery";
import {
	SchoolExternalTool,
	ToolConfigurationStatus,
} from "@/store/external-tool";

export const schoolExternalToolFactory = Factory.define<SchoolExternalTool>(
	({ sequence }) => ({
		id: `schoolExternalTool${sequence}`,
		toolId: "toolId",
		name: "name",
		parameters: [],
		status: ToolConfigurationStatus.Latest,
		version: 1,
	})
);
