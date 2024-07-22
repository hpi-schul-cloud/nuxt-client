import { ContextExternalToolConfigurationTemplate } from "@data-external-tool";
import { Factory } from "fishery";

export const contextExternalToolConfigurationTemplateFactory =
	Factory.define<ContextExternalToolConfigurationTemplate>(({ sequence }) => ({
		externalToolId: `externalTool${sequence}`,
		schoolExternalToolId: `schoolExternalTool${sequence}`,
		baseUrl: `https://context-external-tool-${sequence}.com`,
		name: "Template Name",
		parameters: [],
	}));
