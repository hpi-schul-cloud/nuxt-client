import { Factory } from "fishery";
import { ToolConfigurationTemplate } from "@/store/external-tool";

export const toolConfigurationTemplateFactory =
	Factory.define<ToolConfigurationTemplate>(({ sequence }) => ({
		id: `tool${sequence}`,
		configId: "configId",
		version: 1,
		name: "toolName",
		logoUrl: "logoUrl",
		parameters: [],
	}));
