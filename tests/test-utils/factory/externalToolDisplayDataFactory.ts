import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { Factory } from "fishery";
import { toolConfigurationStatusFactory } from "./toolConfigurationStatusFactory";

export const externalToolDisplayDataFactory =
	Factory.define<ExternalToolDisplayData>(({ sequence }) => ({
		contextExternalToolId: `schoolExternalTool${sequence}`,
		name: `name${sequence}`,
		openInNewTab: false,
		status: toolConfigurationStatusFactory.build(),
	}));
