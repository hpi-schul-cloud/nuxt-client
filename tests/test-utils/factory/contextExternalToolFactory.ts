import { ToolContextType } from "@/store/external-tool";
import { Factory } from "fishery";
import { ContextExternalTool } from "@/store/external-tool/context-external-tool";

export const contextExternalToolFactory = Factory.define<ContextExternalTool>(
	() => ({
		id: "id",
		schoolToolId: "schoolToolId",
		contextId: "contextId",
		contextType: ToolContextType.COURSE,
		parameters: [],
		toolVersion: 1,
	})
);
