import type { ExternalToolDisplayData } from "./types";

export const hasExternalToolContent = (displayData: ExternalToolDisplayData | undefined) =>
	!!displayData && (!displayData.isLtiDeepLinkingTool || !!displayData.ltiDeepLink);
