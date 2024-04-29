import { ContextExternalToolSave } from "@/modules/data/external-tool/types/context-external-tool";
import { ToolContextType } from "@/serverApi/v3";
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
