import { ToolContextType } from "@/serverApi/v3";
import { ContextExternalToolSave } from "@/store/external-tool/context-external-tool";
import { Factory } from "fishery";

export const contextExternalToolSaveFactory =
	Factory.define<ContextExternalToolSave>(({ sequence }) => ({
		contextId: `context-${sequence}`,
		contextType: ToolContextType.Course,
		schoolToolId: `school-external-tool-${sequence}`,
		displayName: `Tool ${sequence}`,
		toolVersion: 1,
		parameters: [],
	}));
