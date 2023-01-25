import { SchoolExternalToolStatusEnum } from "./school-external-tool-status.enum";

export interface SchoolExternalTool {
	id: string;

	name: string;

	status: SchoolExternalToolStatusEnum;

	version?: number;
}
