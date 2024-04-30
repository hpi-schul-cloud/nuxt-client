import { SchoolExternalToolConfigurationTemplate } from "@data-external-tool";
import { Factory } from "fishery";

export const schoolExternalToolConfigurationTemplate =
	Factory.define<SchoolExternalToolConfigurationTemplate>(({ sequence }) => ({
		externalToolId: `tool${sequence}`,
		configId: "configId",
		version: 1,
		name: "toolName",
		logoUrl: "logoUrl",
		parameters: [],
		isDeactivated: false,
	}));
