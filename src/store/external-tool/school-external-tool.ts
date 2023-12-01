import { ToolParameterEntry } from "./tool-parameter-entry";
import { SchoolToolConfigurationStatus } from "./school-external-tool-configuration-status";

export interface SchoolExternalToolSave {
	toolId: string;

	schoolId: string;

	parameters: ToolParameterEntry[];

	version: number;
}

export interface SchoolExternalTool extends SchoolExternalToolSave {
	id: string;

	name: string;

	status: SchoolToolConfigurationStatus;
}
