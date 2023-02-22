import { ToolParameter } from "@/store/external-tool/tool-parameter";
import { ToolParameterScope } from "@/store/external-tool/tool-parameter-scope.enum";
import { ToolParameterType } from "@/store/external-tool/tool-parameter.enum";
import { ToolParameterLocation } from "@/store/external-tool/tool-parameter-location.enum";

export const toolParameterFactory = (
	param: Partial<ToolParameter> = {}
): ToolParameter => {
	return {
		value: undefined,
		default: undefined,
		scope: ToolParameterScope.School,
		type: ToolParameterType.String,
		location: ToolParameterLocation.Path,
		name: "Parameter1",
		isOptional: true,
		...param,
	};
};
