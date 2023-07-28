import {
	SchoolExternalToolResponse,
	SchoolExternalToolResponseStatusEnum,
} from "@/serverApi/v3";
import { Factory } from "fishery";

export const schoolExternalToolResponseFactory =
	Factory.define<SchoolExternalToolResponse>(({ sequence }) => ({
		id: `school-external-tool-${sequence}`,
		schoolId: `school-${sequence}`,
		toolId: `tool-${sequence}`,
		name: `SchoolExternalTool${sequence}`,
		status: SchoolExternalToolResponseStatusEnum.Latest,
		parameters: [],
		toolVersion: 1,
	}));
