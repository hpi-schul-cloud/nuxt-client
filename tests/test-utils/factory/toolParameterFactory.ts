import { Factory } from "fishery";
import { ToolParameter } from "@/store/external-tool/tool-parameter";
import { ToolParameterScope } from "@/store/external-tool/tool-parameter-scope.enum";
import { ToolParameterType } from "@/store/external-tool/tool-parameter.enum";
import { ToolParameterLocation } from "@/store/external-tool/tool-parameter-location.enum";

export const toolParameterFactory = Factory.define<ToolParameter>(
	({ sequence }) => ({
		defaultValue: undefined,
		scope: ToolParameterScope.School,
		type: ToolParameterType.String,
		location: ToolParameterLocation.PATH,
		name: `parameter-${sequence}`,
		displayName: `Parameter ${sequence}`,
		description: "test description",
		isOptional: true,
		isProtected: false,
	})
);
