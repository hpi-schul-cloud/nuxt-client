import { SchoolExternalToolConfigurationTemplate } from "@data-external-tool";
import { Factory } from "fishery";

export const schoolExternalToolConfigurationTemplate =
	Factory.define<SchoolExternalToolConfigurationTemplate>(({ sequence }) => ({
		externalToolId: `tool${sequence}`,
		configId: "configId",
		name: "toolName",
		baseUrl: `https://school-external-tool-${sequence}.com`,
		logoUrl: "logoUrl",
		parameters: [],
		isDeactivated: false,
		mediumId: "mediumId",
		mediaSourceId: "mediumSourceId",
	}));
