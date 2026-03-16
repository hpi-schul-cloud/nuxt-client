import { ToolContextType } from "@api-server";
import { ContextExternalTool } from "@data-external-tool";
import { Factory } from "fishery";

export const contextExternalToolFactory = Factory.define<ContextExternalTool>(() => ({
	id: "id",
	schoolToolId: "schoolToolId",
	contextId: "contextId",
	contextType: ToolContextType.COURSE,
	parameters: [],
}));
