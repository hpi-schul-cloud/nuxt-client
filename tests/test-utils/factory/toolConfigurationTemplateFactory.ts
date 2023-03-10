import { ToolConfigurationTemplate } from "@/store/external-tool";

export const toolConfigurationTemplateFactory = (
	param: Partial<ToolConfigurationTemplate> = {}
): ToolConfigurationTemplate => {
	return {
		id: "toolId",
		configId: "configId",
		version: 1,
		name: "toolName",
		logoUrl: "logoUrl",
		parameters: [],
		...param,
	};
};
