import { ToolParameterLocation, ToolParameterScope, ToolParameterType } from "../types";
import { CustomParameterLocationParams, CustomParameterScopeTypeParams, CustomParameterTypeParams } from "@api-server";

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
	[CustomParameterTypeParams.AUTO_CONTEXTID]: ToolParameterType.AutoContextId,
	[CustomParameterTypeParams.AUTO_CONTEXTNAME]: ToolParameterType.AutoContextName,
	[CustomParameterTypeParams.AUTO_SCHOOLID]: ToolParameterType.AutoSchoolId,
	[CustomParameterTypeParams.AUTO_SCHOOLNUMBER]: ToolParameterType.AutoSchoolNumber,
	[CustomParameterTypeParams.AUTO_MEDIUMID]: ToolParameterType.AutoMediumId,
	[CustomParameterTypeParams.AUTO_GROUP_EXTERNALUUID]: ToolParameterType.AutoGroupExternalUuid,
	[CustomParameterTypeParams.AUTO_PUBLISHER]: ToolParameterType.AutoPublisher,
};

export const ToolParamScopeMapping: Record<CustomParameterScopeTypeParams, ToolParameterScope> = {
	[CustomParameterScopeTypeParams.CONTEXT]: ToolParameterScope.Context,
	[CustomParameterScopeTypeParams.GLOBAL]: ToolParameterScope.Global,
	[CustomParameterScopeTypeParams.SCHOOL]: ToolParameterScope.School,
};
