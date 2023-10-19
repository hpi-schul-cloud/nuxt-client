import {
	ToolConfigurationStatusResponse,
	ToolReferenceResponse,
} from "@/serverApi/v3";
import { Factory } from "fishery";

export const toolReferenceResponseFactory =
	Factory.define<ToolReferenceResponse>(({ sequence }) => ({
		contextToolId: `context-external-tool-${sequence}`,
		status: ToolConfigurationStatusResponse.Latest,
		openInNewTab: true,
		displayName: `Tool ${sequence}`,
	}));
