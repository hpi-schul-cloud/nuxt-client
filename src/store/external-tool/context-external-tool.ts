import { ToolParameterEntry } from "./tool-parameter-entry";
import { ToolContextType } from "./tool-context-type.enum";
import { ContextExternalToolResponseContextTypeEnum } from "../../serverApi/v3";

export interface ContextExternalTool {
	id: string;
	schoolToolId: string;
	contextId: string;
	contextType: ContextExternalToolResponseContextTypeEnum; //ToolContextType;
	parameters: ToolParameterEntry[];
	toolVersion: number;
	displayName?: string;
}
