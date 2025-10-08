import { ContextExternalToolConfigurationStatus } from "./context-external-tool-configuration-status";
import { LtiDeepLinkResponse } from "@/serverApi/v3";

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
