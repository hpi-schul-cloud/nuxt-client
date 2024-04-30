import { ToolContextType } from "@/serverApi/v3";
import { ToolParameterEntry } from "@/store/external-tool";

export interface ContextExternalToolSave {
	schoolToolId: string;

	contextId: string;

	contextType: ToolContextType;

	parameters: ToolParameterEntry[];

	toolVersion: number;

	displayName?: string;
}

export interface ContextExternalTool extends ContextExternalToolSave {
	id: string;
}
