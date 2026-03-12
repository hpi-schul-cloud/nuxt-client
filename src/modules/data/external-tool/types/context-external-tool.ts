import { ToolParameterEntry } from "@/store/external-tool";
import { ToolContextType } from "@api-server";

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
