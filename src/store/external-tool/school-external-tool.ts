import { SchoolExternalToolStatus } from "./school-external-tool-status";

export interface SchoolExternalTool {
	id: string;

	name: string;

	status: SchoolExternalToolStatus;

	version?: number;
}
