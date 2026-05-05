import { ToolParameter, ToolParameterLocation, ToolParameterScope, ToolParameterType } from "@data-external-tool";
import { Factory } from "fishery";

export const toolParameterFactory = Factory.define<ToolParameter>(({ sequence }) => ({
	defaultValue: undefined,
	scope: ToolParameterScope.School,
	type: ToolParameterType.String,
	location: ToolParameterLocation.PATH,
	name: `parameter-${sequence}`,
	displayName: `Parameter ${sequence}`,
	description: "test description",
	isOptional: true,
	isProtected: false,
}));
