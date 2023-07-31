import { Factory } from "fishery";
import { ContextExternalToolConfigurationTemplate } from "@/store/external-tool";

export const contextExternalToolConfigurationTemplateFactory =
	Factory.define<ContextExternalToolConfigurationTemplate>(({ sequence }) => ({
		externalToolId: `externalTool${sequence}`,
		schoolExternalToolId: `schoolExternalTool${sequence}`,
		name: "Template Name",
		parameters: [],
		version: 1,
	}));
