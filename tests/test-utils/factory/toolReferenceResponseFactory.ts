import { ToolReferenceResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { toolConfigurationStatusFactory } from "./toolConfigurationSatusFactory";

export const toolReferenceResponseFactory =
	Factory.define<ToolReferenceResponse>(({ sequence }) => ({
		contextToolId: `context-external-tool-${sequence}`,
		status: toolConfigurationStatusFactory.build(),
		openInNewTab: true,
		displayName: `Tool ${sequence}`,
	}));
