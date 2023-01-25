import { ToolParameter } from "./tool-parameter";

export interface ToolConfigurationTemplate {
	id: string;

	name: string;

	logoUrl?: string;

	parameters: ToolParameter[];

	version: number;
}
