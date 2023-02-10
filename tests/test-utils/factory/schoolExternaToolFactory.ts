import {
	SchoolExternalTool,
	SchoolExternalToolStatus,
} from "@/store/external-tool";

export const schoolExternalToolFactory = (
	param: Partial<SchoolExternalTool> = {}
): SchoolExternalTool => {
	return {
		name: "name",
		status: SchoolExternalToolStatus.Latest,
		id: "id",
		version: 1,
		...param,
	};
};
