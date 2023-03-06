import { SchoolExternalToolStatus } from "./school-external-tool-status.enum";
import { ToolParameterEntry } from "./tool-parameter-entry";

export interface SchoolExternalTool {
	id: string;

	toolId: string;

	name: string;

	parameters: ToolParameterEntry[];

	status: SchoolExternalToolStatus;

	version?: number;
}
