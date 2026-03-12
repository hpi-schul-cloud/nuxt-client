import {
	ContextExternalToolResponse,
	ContextExternalToolResponseContextType,
} from "@api-server";
import { Factory } from "fishery";

export const contextExternalToolResponseFactory =
	Factory.define<ContextExternalToolResponse>(({ sequence }) => ({
		id: `context-external-tool-${sequence}`,
		contextId: `context-${sequence}`,
		contextType: ContextExternalToolResponseContextType.COURSE,
		schoolToolId: `school-external-tool-${sequence}`,
		parameters: [],
	}));
