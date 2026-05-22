import { ContextExternalToolResponse, ToolContextType } from "@api-server";
import { Factory } from "fishery";

export const contextExternalToolResponseFactory = Factory.define<ContextExternalToolResponse>(({ sequence }) => ({
	id: `context-external-tool-${sequence}`,
	contextId: `context-${sequence}`,
	contextType: ToolContextType.COURSE,
	schoolToolId: `school-external-tool-${sequence}`,
	parameters: [],
}));
