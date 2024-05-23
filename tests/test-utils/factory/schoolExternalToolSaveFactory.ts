import { SchoolExternalToolSave } from "@/store/external-tool";
import { Factory } from "fishery";

export const schoolExternalToolSaveFactory =
	Factory.define<SchoolExternalToolSave>(({ sequence }) => ({
		toolId: `school-external-tool-${sequence}`,
		schoolId: `school-${sequence}`,
		parameters: [],
		isDeactivated: false,
	}));
