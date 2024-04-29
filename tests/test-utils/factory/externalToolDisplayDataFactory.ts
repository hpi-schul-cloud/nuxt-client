import { ExternalToolDisplayData } from "@/modules/data/external-tool/types/external-tool-display-data";
import { Factory } from "fishery";
import { ContextExternalToolConfigurationStatusFactory } from "./contextExternalToolConfigurationStatusFactory";

export const externalToolDisplayDataFactory =
	Factory.define<ExternalToolDisplayData>(({ sequence }) => ({
		contextExternalToolId: `schoolExternalTool${sequence}`,
		name: `name${sequence}`,
		openInNewTab: false,
		status: ContextExternalToolConfigurationStatusFactory.build(),
	}));
