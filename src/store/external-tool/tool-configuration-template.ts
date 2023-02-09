import { ToolParameter } from "./tool-parameter";

export interface ToolConfigurationTemplate {
	id: string;

	name: string;

	logoUrl: string | undefined;

	parameters: ToolParameter[];

	version: number;
}
