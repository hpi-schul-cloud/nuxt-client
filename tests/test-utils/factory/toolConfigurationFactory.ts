import { ToolConfigurationListItem } from "@/store/external-tool";

export const toolConfigurationFactory = (
	param: Partial<ToolConfigurationListItem> = {}
): ToolConfigurationListItem => {
	return {
		name: "name",
		id: "id",
		logoUrl: "logoUrl",
		...param,
	};
};
