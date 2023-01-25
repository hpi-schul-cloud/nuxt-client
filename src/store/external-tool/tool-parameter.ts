import { ToolParameterScopeEnum } from "./tool-parameter-scope.enum";
import { ToolParameterLocationEnum } from "./tool-parameter-location.enum";
import { ToolParameterTypeEnum } from "./tool-parameter-type.enum";

export interface ToolParameter {
	name: string;

	_default?: string;

	regex?: string;

	regexComment?: string;

	scope: ToolParameterScopeEnum;

	location: ToolParameterLocationEnum;

	type: ToolParameterTypeEnum;

	isOptional: boolean;

	value?: string;
}
