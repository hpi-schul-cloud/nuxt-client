import { ToolParameterType } from "./tool-parameter.enum";
import { ToolParameterLocation } from "./tool-parameter-location.enum";
import { ToolParameterScope } from "./tool-parameter-scope.enum";

export interface ToolParameter {
	name: string;

	displayName: string;

	description?: string;

	defaultValue?: string;

	regex?: string;

	regexComment?: string;

	scope: ToolParameterScope;

	location: ToolParameterLocation;

	type: ToolParameterType;

	isOptional: boolean;

	isProtected: boolean;
}
