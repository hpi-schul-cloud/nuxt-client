import { ExternalToolDisplayData } from "@data-external-tool";
import { Factory } from "fishery";
import { contextExternalToolConfigurationStatusFactory } from "./contextExternalToolConfigurationStatusFactory";

export const externalToolDisplayDataFactory =
	Factory.define<ExternalToolDisplayData>(({ sequence }) => ({
		contextExternalToolId: `schoolExternalTool${sequence}`,
		title: "title",
		name: `name${sequence}`,
		domain: "example.com",
		openInNewTab: false,
		status: contextExternalToolConfigurationStatusFactory.build(),
		logoUrl: "https://example.com/logo.png",
		isLtiDeepLinkingTool: false,
	}));
