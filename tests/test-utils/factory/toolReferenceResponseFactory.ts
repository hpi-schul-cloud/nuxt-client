import {
	ToolReferenceResponse,
	ToolReferenceResponseStatusEnum,
} from "@/serverApi/v3";
import { Factory } from "fishery";

export const toolReferenceResponseFactory =
	Factory.define<ToolReferenceResponse>(({ sequence }) => ({
		contextToolId: `context-external-tool-${sequence}`,
		status: ToolReferenceResponseStatusEnum.Latest,
		openInNewTab: true,
		displayName: `Tool ${sequence}`,
	}));
