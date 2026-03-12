import { ToolContextType } from "@api-server";
import { ToolParameterEntry } from "@/store/external-tool";

export interface ContextExternalToolSave {
	schoolToolId: string;

	contextId: string;

	contextType: ToolContextType;

	parameters: ToolParameterEntry[];

	displayName?: string;
}

export interface ContextExternalTool extends ContextExternalToolSave {
	id: string;
}
