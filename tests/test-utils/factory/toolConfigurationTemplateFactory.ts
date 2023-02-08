import { ToolConfigurationTemplate } from "@/store/external-tool";

export const toolConfigurationTemplateFactory = (
	param: Partial<ToolConfigurationTemplate> = {}
): ToolConfigurationTemplate => {
	return {
		id: "id",
		version: 1,
		name: "name",
		logoUrl: "logoUrl",
		parameters: [],
		...param,
	};
};
