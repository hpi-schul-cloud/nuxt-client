import { ToolReferenceResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { contextExternalToolConfigurationStatusFactory } from "./contextExternalToolConfigurationStatusFactory";

export const toolReferenceResponseFactory =
	Factory.define<ToolReferenceResponse>(({ sequence }) => ({
		contextToolId: `context-external-tool-${sequence}`,
		status: contextExternalToolConfigurationStatusFactory.build(),
		openInNewTab: true,
		displayName: `Tool ${sequence}`,
	}));
