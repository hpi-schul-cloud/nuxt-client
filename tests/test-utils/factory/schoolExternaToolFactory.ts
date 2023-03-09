import {
	SchoolExternalTool,
	SchoolExternalToolStatus,
} from "@/store/external-tool";

export const schoolExternalToolFactory = (
	param: Partial<SchoolExternalTool> = {}
): SchoolExternalTool => {
	return {
		id: "id",
		toolId: "toolId",
		name: "name",
		parameters: [],
		status: SchoolExternalToolStatus.Latest,
		version: 1,
		...param,
	};
};
