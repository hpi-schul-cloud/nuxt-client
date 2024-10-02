import { ToolParameterEntry } from "./tool-parameter-entry";
import { SchoolExternalToolConfigurationStatus } from "./school-external-tool-configuration-status";
import { ToolContextType } from "@/serverApi/v3";

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

	restrictToContexts?: ToolContextType[];
}
