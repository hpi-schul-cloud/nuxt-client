import { ToolParameterType } from "../tool-parameter.enum";
import { ToolParameterEntry } from "../tool-parameter-entry";
import { ToolParameterLocation } from "../tool-parameter-location.enum";
import { ToolParameterScope } from "../tool-parameter-scope.enum";
import {
	ContextExternalToolConfigurationStatusResponse,
	CustomParameterEntryParam,
	CustomParameterEntryResponse,
	CustomParameterLocationParams,
	CustomParameterScopeTypeParams,
	CustomParameterTypeParams,
	LaunchRequestMethod,
} from "@/serverApi/v3";
import { ToolLaunchRequestMethodEnum } from "@/store/external-tool";
import { ContextExternalToolConfigurationStatus } from "@data-external-tool";

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

export const ToolLaunchRequestMethodMapping: Record<LaunchRequestMethod, ToolLaunchRequestMethodEnum> = {
	[LaunchRequestMethod.Get]: ToolLaunchRequestMethodEnum.Get,
	[LaunchRequestMethod.Post]: ToolLaunchRequestMethodEnum.Post,
};

export class CommonToolMapper {
	static mapToCustomParameterEntryParam(parameter: ToolParameterEntry): CustomParameterEntryParam {
		const mapped: CustomParameterEntryParam = {
			name: parameter.name,
			value: parameter.value,
		};

		return mapped;
	}

	static mapToToolParameterEntry(response: CustomParameterEntryResponse): ToolParameterEntry {
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
			isIncompleteOperationalOnScopeContext: status.isIncompleteOperationalOnScopeContext,
			isDeactivated: status.isDeactivated,
			isNotLicensed: status.isNotLicensed,
		};

		return mapped;
	}
}
