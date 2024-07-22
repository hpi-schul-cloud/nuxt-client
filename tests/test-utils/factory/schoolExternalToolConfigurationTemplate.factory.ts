import { SchoolExternalToolConfigurationTemplate } from "@data-external-tool";
import { Factory } from "fishery";

export const schoolExternalToolConfigurationTemplateFactory =
	Factory.define<SchoolExternalToolConfigurationTemplate>(({ sequence }) => ({
		externalToolId: `externalTool${sequence}`,
		name: "Template Name",
		baseUrl: `https://school-external-tool-${sequence}.com`,
		parameters: [],
		isDeactivated: false,
	}));
