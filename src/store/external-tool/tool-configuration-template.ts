import { ToolParameter } from "./tool-parameter";

export class ToolConfigurationTemplate {
	id: string;

	name: string;

	logoUrl: string | undefined;

	parameters: ToolParameter[];

	version: number;

	constructor() {
		this.id = "";
		this.name = "";
		this.logoUrl = undefined;
		this.parameters = [];
		this.version = 0;
	}
}
