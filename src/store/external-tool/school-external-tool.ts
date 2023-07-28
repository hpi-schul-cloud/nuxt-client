import { ToolParameterEntry } from "./tool-parameter-entry";
import { ToolConfigurationStatus } from "@/store/external-tool/tool-configuration-status.enum";

export interface SchoolExternalTool {
	id: string;

	toolId: string;

	name: string;

	parameters: ToolParameterEntry[];

	status: ToolConfigurationStatus;

	version?: number;
}
