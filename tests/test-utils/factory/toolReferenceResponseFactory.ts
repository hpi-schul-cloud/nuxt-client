import { ToolReferenceResponse } from "@api-server";
import { Factory } from "fishery";
import { contextExternalToolConfigurationStatusFactory } from "./contextExternalToolConfigurationStatusFactory";

export const toolReferenceResponseFactory =
	Factory.define<ToolReferenceResponse>(({ sequence }) => ({
		contextToolId: `context-external-tool-${sequence}`,
		domain: "example.com",
		status: contextExternalToolConfigurationStatusFactory.build(),
		openInNewTab: true,
		displayName: `Tool ${sequence}`,
		isLtiDeepLinkingTool: false,
	}));
