import { ToolParameterType } from "../tool-parameter.enum";
import { ToolParameterLocation } from "../tool-parameter-location.enum";
import { ToolParameterScope } from "../tool-parameter-scope.enum";
import {
	CustomParameterLocationParams,
	CustomParameterScopeTypeParams,
	CustomParameterTypeParams,
} from "@/generated/serverApi/v3";

export const ToolParamLocationMapping: Record<CustomParameterLocationParams, ToolParameterLocation> = {
	[CustomParameterLocationParams.PATH]: ToolParameterLocation.PATH,
	[CustomParameterLocationParams.QUERY]: ToolParameterLocation.QUERY,
	[CustomParameterLocationParams.BODY]: ToolParameterLocation.BODY,
	[CustomParameterLocationParams.FRAGMENT]: ToolParameterLocation.FRAGMENT,
};

export const ToolParamTypeMapping: Record<CustomParameterTypeParams, ToolParameterType> = {
	[CustomParameterTypeParams.STRING]: ToolParameterType.String,
	[CustomParameterTypeParams.BOOLEAN]: ToolParameterType.Boolean,
	[CustomParameterTypeParams.NUMBER]: ToolParameterType.Number,
	[CustomParameterTypeParams.AUTO_CONTEXTID]: ToolParameterType.AutoContextid,
	[CustomParameterTypeParams.AUTO_CONTEXTNAME]: ToolParameterType.AutoContextname,
	[CustomParameterTypeParams.AUTO_SCHOOLID]: ToolParameterType.AutoSchoolid,
	[CustomParameterTypeParams.AUTO_SCHOOLNUMBER]: ToolParameterType.AutoSchoolnumber,
	[CustomParameterTypeParams.AUTO_MEDIUMID]: ToolParameterType.AutoMediumid,
	[CustomParameterTypeParams.AUTO_GROUP_EXTERNALUUID]: ToolParameterType.AutoGroupExternaluuid,
	[CustomParameterTypeParams.AUTO_PUBLISHER]: ToolParameterType.AutoPublisher,
};

export const ToolParamScopeMapping: Record<CustomParameterScopeTypeParams, ToolParameterScope> = {
	[CustomParameterScopeTypeParams.CONTEXT]: ToolParameterScope.Context,
	[CustomParameterScopeTypeParams.GLOBAL]: ToolParameterScope.Global,
	[CustomParameterScopeTypeParams.SCHOOL]: ToolParameterScope.School,
};
