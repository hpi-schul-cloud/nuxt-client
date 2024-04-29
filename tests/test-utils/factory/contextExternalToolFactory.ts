import { ContextExternalTool } from "@/modules/data/external-tool/types/context-external-tool";
import { ToolContextType } from "@/serverApi/v3";
import { Factory } from "fishery";

export const contextExternalToolFactory = Factory.define<ContextExternalTool>(
	() => ({
		id: "id",
		schoolToolId: "schoolToolId",
		contextId: "contextId",
		contextType: ToolContextType.Course,
		parameters: [],
		toolVersion: 1,
	})
);
