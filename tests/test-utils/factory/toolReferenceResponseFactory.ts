import { ToolReferenceResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { ContextExternalToolConfigurationStatusFactory } from "./contextExternalToolConfigurationStatusFactory";

export const toolReferenceResponseFactory =
	Factory.define<ToolReferenceResponse>(({ sequence }) => ({
		contextToolId: `context-external-tool-${sequence}`,
		status: ContextExternalToolConfigurationStatusFactory.build(),
		openInNewTab: true,
		displayName: `Tool ${sequence}`,
	}));
