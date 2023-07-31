import { ToolParameterEntry } from "./tool-parameter-entry";
import { ToolConfigurationStatus } from "@/store/external-tool/tool-configuration-status.enum";

export interface SchoolExternalToolSave {
	toolId: string;

	schoolId: string;

	parameters: ToolParameterEntry[];

	version: number;
}

export interface SchoolExternalTool extends SchoolExternalToolSave {
	id: string;

	name: string;

	status: ToolConfigurationStatus;
}
