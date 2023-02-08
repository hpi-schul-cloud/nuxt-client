import { ToolConfiguration } from "@/store/external-tool";

export const toolConfigurationFactory = (
	param: Partial<ToolConfiguration> = {}
): ToolConfiguration => {
	return {
		name: "name",
		id: "id",
		logoUrl: "logoUrl",
		...param,
	};
};
