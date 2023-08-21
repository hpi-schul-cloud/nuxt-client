import { ToolContextType } from "./tool-context-type.enum";
import { ToolParameterEntry } from "./tool-parameter-entry";

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
