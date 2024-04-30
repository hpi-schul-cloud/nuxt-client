import { ContextExternalToolConfigurationTemplate } from "@data-external-tool";
import { Factory } from "fishery";

export const contextExternalToolConfigurationTemplateFactory =
	Factory.define<ContextExternalToolConfigurationTemplate>(({ sequence }) => ({
		externalToolId: `externalTool${sequence}`,
		schoolExternalToolId: `schoolExternalTool${sequence}`,
		name: "Template Name",
		parameters: [],
		version: 1,
	}));
