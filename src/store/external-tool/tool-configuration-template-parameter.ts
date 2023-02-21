import { ToolParameterScope } from "./tool-parameter-scope.enum";
import { ToolParameterLocation } from "./tool-parameter-location.enum";
import { ToolParameterType } from "./tool-parameter.enum";

export interface ToolConfigurationTemplateParameter {
	name: string;

	default?: string;

	regex?: string;

	regexComment?: string;

	scope: ToolParameterScope;

	location: ToolParameterLocation;

	type: ToolParameterType;

	isOptional: boolean;

	value?: string;
}
