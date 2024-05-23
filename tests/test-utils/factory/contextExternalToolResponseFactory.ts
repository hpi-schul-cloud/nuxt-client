import {
	ContextExternalToolResponse,
	ContextExternalToolResponseContextTypeEnum,
} from "@/serverApi/v3";
import { Factory } from "fishery";

export const contextExternalToolResponseFactory =
	Factory.define<ContextExternalToolResponse>(({ sequence }) => ({
		id: `context-external-tool-${sequence}`,
		contextId: `context-${sequence}`,
		contextType: ContextExternalToolResponseContextTypeEnum.Course,
		schoolToolId: `school-external-tool-${sequence}`,
		parameters: [],
	}));
