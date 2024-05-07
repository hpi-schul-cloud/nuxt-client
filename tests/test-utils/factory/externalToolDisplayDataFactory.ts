import { ExternalToolDisplayData } from "@data-external-tool";
import { Factory } from "fishery";
import { ContextExternalToolConfigurationStatusFactory } from "./contextExternalToolConfigurationStatusFactory";

export const externalToolDisplayDataFactory =
	Factory.define<ExternalToolDisplayData>(({ sequence }) => ({
		contextExternalToolId: `schoolExternalTool${sequence}`,
		title: "title",
		name: `name${sequence}`,
		openInNewTab: false,
		status: ContextExternalToolConfigurationStatusFactory.build(),
		logoUrl: "https://example.com/logo.png",
	}));
