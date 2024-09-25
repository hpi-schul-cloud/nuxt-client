import { ToolParameterEntry } from "./tool-parameter-entry";
import { SchoolExternalToolConfigurationStatus } from "./school-external-tool-configuration-status";

export interface SchoolExternalToolSave {
	toolId: string;

	schoolId: string;

	parameters: ToolParameterEntry[];

	isDeactivated: boolean;
}

export interface SchoolExternalTool extends SchoolExternalToolSave {
	id: string;

	name: string;

	status: SchoolExternalToolConfigurationStatus;

	restrictToContexts?: string[];
}
