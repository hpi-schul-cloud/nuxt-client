import { Factory } from "fishery";
import { SchoolExternalToolConfigurationTemplate } from "@/store/external-tool";

export const schoolExternalToolConfigurationTemplate =
	Factory.define<SchoolExternalToolConfigurationTemplate>(({ sequence }) => ({
		externalToolId: `tool${sequence}`,
		configId: "configId",
		version: 1,
		name: "toolName",
		logoUrl: "logoUrl",
		parameters: [],
	}));
