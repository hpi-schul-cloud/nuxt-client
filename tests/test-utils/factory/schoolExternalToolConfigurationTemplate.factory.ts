import { Factory } from "fishery";
import { SchoolExternalToolConfigurationTemplate } from "@/store/external-tool";

export const schoolExternalToolConfigurationTemplateFactory =
	Factory.define<SchoolExternalToolConfigurationTemplate>(({ sequence }) => ({
		externalToolId: `externalTool${sequence}`,
		name: "Template Name",
		parameters: [],
		version: 1,
	}));
