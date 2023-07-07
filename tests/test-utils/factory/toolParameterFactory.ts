import { Factory } from "fishery";
import { ToolParameter } from "@/store/external-tool/tool-parameter";
import { ToolParameterScope } from "@/store/external-tool/tool-parameter-scope.enum";
import { ToolParameterType } from "@/store/external-tool/tool-parameter.enum";
import { ToolParameterLocation } from "@/store/external-tool/tool-parameter-location.enum";

export const toolParameterFactory = Factory.define<ToolParameter>(() => ({
	value: undefined,
	default: undefined,
	scope: ToolParameterScope.School,
	type: ToolParameterType.String,
	location: ToolParameterLocation.PATH,
	name: "Parameter1",
	displayName: "Parameter 1",
	description: "test description",
	isOptional: true,
}));
