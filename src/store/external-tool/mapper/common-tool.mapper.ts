import {
	CustomParameterEntryParam,
	CustomParameterEntryResponse,
	CustomParameterResponseLocationEnum,
	CustomParameterResponseScopeEnum,
	CustomParameterResponseTypeEnum,
	ToolReferenceResponseStatusEnum,
} from "@/serverApi/v3";
import { ToolConfigurationStatus } from "../tool-configuration-status.enum";
import { ToolParameterEntry } from "../tool-parameter-entry";
import { ToolParameterLocation } from "../tool-parameter-location.enum";
import { ToolParameterScope } from "../tool-parameter-scope.enum";
import { ToolParameterType } from "../tool-parameter.enum";

export const ToolParamLocationMapping: Record<
	CustomParameterResponseLocationEnum,
	ToolParameterLocation
> = {
	[CustomParameterResponseLocationEnum.Path]: ToolParameterLocation.PATH,
	[CustomParameterResponseLocationEnum.Query]: ToolParameterLocation.QUERY,
	[CustomParameterResponseLocationEnum.Body]: ToolParameterLocation.BODY,
};

export const ToolParamTypeMapping: Record<
	CustomParameterResponseTypeEnum,
	ToolParameterType
> = {
	[CustomParameterResponseTypeEnum.String]: ToolParameterType.String,
	[CustomParameterResponseTypeEnum.Boolean]: ToolParameterType.Boolean,
	[CustomParameterResponseTypeEnum.Number]: ToolParameterType.Number,
	[CustomParameterResponseTypeEnum.AutoContextid]:
		ToolParameterType.AutoContextid,
	[CustomParameterResponseTypeEnum.AutoContextname]:
		ToolParameterType.AutoContextname,
	[CustomParameterResponseTypeEnum.AutoSchoolid]:
		ToolParameterType.AutoSchoolid,
	[CustomParameterResponseTypeEnum.AutoSchoolnumber]:
		ToolParameterType.AutoSchoolnumber,
};

export const ToolParamScopeMapping: Record<
	CustomParameterResponseScopeEnum,
	ToolParameterScope
> = {
	[CustomParameterResponseScopeEnum.Context]: ToolParameterScope.Context,
	[CustomParameterResponseScopeEnum.Global]: ToolParameterScope.Global,
	[CustomParameterResponseScopeEnum.School]: ToolParameterScope.School,
};

export const ToolConfigurationStatusMapping: Record<
	ToolReferenceResponseStatusEnum,
	ToolConfigurationStatus
> = {
	[ToolReferenceResponseStatusEnum.Latest]: ToolConfigurationStatus.Latest,
	[ToolReferenceResponseStatusEnum.Outdated]: ToolConfigurationStatus.Outdated,
	[ToolReferenceResponseStatusEnum.Unknown]: ToolConfigurationStatus.Unknown,
};

export class CommonToolMapper {
	static mapToCustomParameterEntryParam(
		parameter: ToolParameterEntry
	): CustomParameterEntryParam {
		const mapped: CustomParameterEntryParam = {
			name: parameter.name,
			value: parameter.value,
		};

		return mapped;
	}

	static mapToToolParameterEntry(
		response: CustomParameterEntryResponse
	): ToolParameterEntry {
		const mapped: ToolParameterEntry = {
			name: response.name,
			value: response.value,
		};

		return mapped;
	}
}
