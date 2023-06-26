import { ToolParameterEntry } from "./tool-parameter-entry";
import { ContextExternalToolResponseContextTypeEnum } from "@/serverApi/v3";

export interface ContextExternalTool {
	id: string;
	schoolToolId: string;
	contextId: string;
	contextType: ContextExternalToolResponseContextTypeEnum;
	parameters: ToolParameterEntry[];
	toolVersion: number;
	displayName?: string;
}
