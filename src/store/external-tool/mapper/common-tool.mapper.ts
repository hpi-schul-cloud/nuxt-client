import { ToolParameterType } from "../tool-parameter.enum";
import { ToolParameterLocation } from "../tool-parameter-location.enum";
import { ToolParameterScope } from "../tool-parameter-scope.enum";
import {
	CustomParameterLocationParams,
	CustomParameterScopeTypeParams,
	CustomParameterTypeParams,
} from "@/serverApi/v3";

export const ToolParamLocationMapping: Record<CustomParameterLocationParams, ToolParameterLocation> = {
	[CustomParameterLocationParams.Path]: ToolParameterLocation.PATH,
	[CustomParameterLocationParams.Query]: ToolParameterLocation.QUERY,
	[CustomParameterLocationParams.Body]: ToolParameterLocation.BODY,
	[CustomParameterLocationParams.Fragment]: ToolParameterLocation.FRAGMENT,
};

export const ToolParamTypeMapping: Record<CustomParameterTypeParams, ToolParameterType> = {
	[CustomParameterTypeParams.String]: ToolParameterType.String,
	[CustomParameterTypeParams.Boolean]: ToolParameterType.Boolean,
	[CustomParameterTypeParams.Number]: ToolParameterType.Number,
	[CustomParameterTypeParams.AutoContextid]: ToolParameterType.AutoContextid,
	[CustomParameterTypeParams.AutoContextname]: ToolParameterType.AutoContextname,
	[CustomParameterTypeParams.AutoSchoolid]: ToolParameterType.AutoSchoolid,
	[CustomParameterTypeParams.AutoSchoolnumber]: ToolParameterType.AutoSchoolnumber,
	[CustomParameterTypeParams.AutoMediumid]: ToolParameterType.AutoMediumid,
	[CustomParameterTypeParams.AutoGroupExternaluuid]: ToolParameterType.AutoGroupExternaluuid,
	[CustomParameterTypeParams.AutoPublisher]: ToolParameterType.AutoPublisher,
};

export const ToolParamScopeMapping: Record<CustomParameterScopeTypeParams, ToolParameterScope> = {
	[CustomParameterScopeTypeParams.Context]: ToolParameterScope.Context,
	[CustomParameterScopeTypeParams.Global]: ToolParameterScope.Global,
	[CustomParameterScopeTypeParams.School]: ToolParameterScope.School,
};
