import {
	ContextExternalToolConfigurationStatusResponse,
	CustomParameterEntryParam,
	CustomParameterEntryResponse,
	CustomParameterResponseLocationEnum,
	CustomParameterResponseScopeEnum,
	CustomParameterResponseTypeEnum,
	ToolLaunchRequestResponseMethodEnum,
} from "@/serverApi/v3";
import { ToolLaunchRequestMethodEnum } from "@/store/external-tool";
import { ContextExternalToolConfigurationStatus } from "@data-external-tool";
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
	[CustomParameterResponseTypeEnum.AutoMediumid]:
		ToolParameterType.AutoMediumid,
};

export const ToolParamScopeMapping: Record<
	CustomParameterResponseScopeEnum,
	ToolParameterScope
> = {
	[CustomParameterResponseScopeEnum.Context]: ToolParameterScope.Context,
	[CustomParameterResponseScopeEnum.Global]: ToolParameterScope.Global,
	[CustomParameterResponseScopeEnum.School]: ToolParameterScope.School,
};

export const ToolLaunchRequestMethodMapping: Record<
	ToolLaunchRequestResponseMethodEnum,
	ToolLaunchRequestMethodEnum
> = {
	[ToolLaunchRequestResponseMethodEnum.Get]: ToolLaunchRequestMethodEnum.Get,
	[ToolLaunchRequestResponseMethodEnum.Post]: ToolLaunchRequestMethodEnum.Post,
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

	static mapContextExternalToolConfigurationStatus(
		status: ContextExternalToolConfigurationStatusResponse
	): ContextExternalToolConfigurationStatus {
		const mapped: ContextExternalToolConfigurationStatus = {
			isOutdatedOnScopeSchool: status.isOutdatedOnScopeSchool,
			isOutdatedOnScopeContext: status.isOutdatedOnScopeContext,
			isIncompleteOnScopeContext: status.isIncompleteOnScopeContext,
			isDeactivated: status.isDeactivated,
		};

		return mapped;
	}
}
