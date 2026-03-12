import { contextExternalToolConfigurationStatusFactory } from "./contextExternalToolConfigurationStatusFactory";
import { ToolReferenceResponse } from "@api-server";
import { Factory } from "fishery";

export const toolReferenceResponseFactory = Factory.define<ToolReferenceResponse>(({ sequence }) => ({
	contextToolId: `context-external-tool-${sequence}`,
	domain: "example.com",
	status: contextExternalToolConfigurationStatusFactory.build(),
	openInNewTab: true,
	displayName: `Tool ${sequence}`,
	isLtiDeepLinkingTool: false,
}));
