import { CustomParameterEntryResponse } from './custom-parameter-entry.response';
import { SchoolExternalToolStatusResponse } from "./school-external-tool-status.response";

export interface SchoolExternalToolResponse {
	name: string;

	toolId: string;

	schoolId: string;

	parameters: CustomParameterEntryResponse[];

	toolVersion: number;

	status: SchoolExternalToolStatusResponse;
}
