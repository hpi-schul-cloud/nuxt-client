import { ToolParameterEntry } from "./tool-parameter";
import { SchoolExternalToolMediumResponse, ToolContextType } from "@api-server";

export interface SchoolExternalToolConfigurationStatus {
	isOutdatedOnScopeSchool: boolean;
	isGloballyDeactivated: boolean;
}

export interface SchoolExternalToolMetadata {
	course: number;
	boardElement: number;
	mediaBoard: number;
}

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
