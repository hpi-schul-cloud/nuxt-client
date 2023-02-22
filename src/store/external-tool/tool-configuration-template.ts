import { ToolConfigurationListItem } from "./tool-configuration-list-item";
import { ToolParameter } from "./tool-parameter";

export interface ToolConfigurationTemplate extends ToolConfigurationListItem {
	configId?: string;

	parameters: ToolParameter[];

	version: number;
}
