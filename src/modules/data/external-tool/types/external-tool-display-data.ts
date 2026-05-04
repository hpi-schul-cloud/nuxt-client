import { ContextExternalToolConfigurationStatus } from "./context-external-tool";
import { LtiDeepLinkResponse } from "@api-server";

export type ExternalToolDisplayData = {
	contextExternalToolId: string;
	name: string;
	domain: string;
	description?: string;
	logoUrl?: string;
	thumbnailUrl?: string;
	openInNewTab: boolean;
	status: ContextExternalToolConfigurationStatus;
	isLtiDeepLinkingTool: boolean;
	ltiDeepLink?: LtiDeepLinkResponse;
};
