import { ToolConfigurationListItem } from "./tool-configuration-list-item";
import { ToolConfigurationTemplateParameter } from "./tool-configuration-template-parameter";

export interface ToolConfigurationTemplate extends ToolConfigurationListItem {
	configId?: string;

	parameters: ToolConfigurationTemplateParameter[];

	version: number;
}
