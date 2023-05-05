import { Factory } from "fishery";
import {
	SchoolExternalTool,
	SchoolExternalToolStatus,
} from "@/store/external-tool";

export const schoolExternalToolFactory = Factory.define<SchoolExternalTool>(
	({ sequence }) => ({
		id: `schoolExternalTool${sequence}`,
		toolId: "toolId",
		name: "name",
		parameters: [],
		status: SchoolExternalToolStatus.Latest,
		version: 1,
	})
);
