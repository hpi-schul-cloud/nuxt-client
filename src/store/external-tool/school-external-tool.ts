import { SchoolExternalToolConfigurationStatus } from "./school-external-tool-configuration-status";
import { ToolParameterEntry } from "./tool-parameter-entry";
import { SchoolExternalToolMediumResponse, ToolContextType } from "@api-server";

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

	medium?: SchoolExternalToolMediumResponse;
}
