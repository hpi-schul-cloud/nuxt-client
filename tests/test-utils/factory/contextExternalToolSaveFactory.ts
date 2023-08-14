import { ToolContextType } from "@/store/external-tool";
import { ContextExternalToolSave } from "@/store/external-tool/context-external-tool";
import { Factory } from "fishery";

export const contextExternalToolSaveFactory =
	Factory.define<ContextExternalToolSave>(({ sequence }) => ({
		contextId: `context-${sequence}`,
		contextType: ToolContextType.COURSE,
		schoolToolId: `school-external-tool-${sequence}`,
		displayName: `Tool ${sequence}`,
		toolVersion: 1,
		parameters: [],
	}));
