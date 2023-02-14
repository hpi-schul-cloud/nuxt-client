import { SchoolExternalToolStatus } from "./school-external-tool-status.enum";

export interface SchoolExternalTool {
	id: string;

	name: string;

	status: SchoolExternalToolStatus;

	version?: number;
}
