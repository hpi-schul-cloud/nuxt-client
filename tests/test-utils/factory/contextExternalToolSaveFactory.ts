import { ToolContextType } from "@api-server";
import { ContextExternalToolSave } from "@data-external-tool";
import { Factory } from "fishery";

export const contextExternalToolSaveFactory = Factory.define<ContextExternalToolSave>(({ sequence }) => ({
	contextId: `context-${sequence}`,
	contextType: ToolContextType.COURSE,
	schoolToolId: `school-external-tool-${sequence}`,
	displayName: `Tool ${sequence}`,
	parameters: [],
}));
