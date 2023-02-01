import {
	CustomParameterEntryParam,
	CustomParameterResponse,
	CustomParameterResponseLocationEnum,
	CustomParameterResponseScopeEnum,
	CustomParameterResponseTypeEnum,
	ExternalToolConfigurationTemplateResponse,
	SchoolExternalToolPostParams,
	ToolConfigurationEntryResponse,
	ToolConfigurationListResponse,
} from "../../../serverApi/v3";
import { ToolParameterLocationEnum } from "@store/external-tool/tool-parameter-location.enum";
import { ToolParameterTypeEnum } from "@store/external-tool/tool-parameter-type.enum";
import { ToolParameterScopeEnum } from "@store/external-tool/tool-parameter-scope.enum";
import { ToolParameter } from "@store/external-tool/tool-parameter";
import {
	ToolConfiguration,
	ToolConfigurationTemplate,
} from "@store/external-tool";
import { externalToolsModule } from "@utils/store-accessor";

const ToolParamLocationMapping: Record<
	CustomParameterResponseLocationEnum,
	ToolParameterLocationEnum
> = {
	[CustomParameterResponseLocationEnum.Path]: ToolParameterLocationEnum.Path,
	[CustomParameterResponseLocationEnum.Query]: ToolParameterLocationEnum.Query,
	[CustomParameterResponseLocationEnum.Token]: ToolParameterLocationEnum.Token,
};

const ToolParamTypeMapping: Record<
	CustomParameterResponseTypeEnum,
	ToolParameterTypeEnum
> = {
	[CustomParameterResponseTypeEnum.String]: ToolParameterTypeEnum.String,
	[CustomParameterResponseTypeEnum.Boolean]: ToolParameterTypeEnum.Boolean,
	[CustomParameterResponseTypeEnum.Number]: ToolParameterTypeEnum.Number,
	[CustomParameterResponseTypeEnum.AutoCourseid]:
		ToolParameterTypeEnum.AutoCourseid,
	[CustomParameterResponseTypeEnum.AutoCoursename]:
		ToolParameterTypeEnum.AutoCoursename,
	[CustomParameterResponseTypeEnum.AutoSchoolid]:
		ToolParameterTypeEnum.AutoSchoolid,
};

const ToolParamScopeMapping: Record<
	CustomParameterResponseScopeEnum,
	ToolParameterScopeEnum
> = {
	[CustomParameterResponseScopeEnum.Course]: ToolParameterScopeEnum.Course,
	[CustomParameterResponseScopeEnum.Global]: ToolParameterScopeEnum.Global,
	[CustomParameterResponseScopeEnum.School]: ToolParameterScopeEnum.School,
};

const BusinessErrorMessageTranslationKeyMap = new Map<string, string>([
	["tool_param_duplicate", "pages.tool.apiError.tool_param_duplicate"],
	["tool_version_mismatch", "pages.tool.apiError.tool_version_mismatch"],
	["tool_param_required", "pages.tool.apiError.tool_param_required"],
	["tool_param_type_mismatch", "pages.tool.apiError.tool_param_type_mismatch"],
	["tool_param_value_regex", "pages.tool.apiError.tool_param_value_regex"],
]);

export function useExternalToolUtils() {
	const mapCustomParameterResponse = (
		parameters: CustomParameterResponse[]
	): ToolParameter[] => {
		return parameters.map((resp: CustomParameterResponse) => {
			return {
				name: resp.name,
				// eslint-disable-next-line no-underscore-dangle
				_default: resp._default,
				isOptional: resp.isOptional,
				regexComment: resp.regexComment,
				location: ToolParamLocationMapping[resp.location],
				regex: resp.regex,
				type: ToolParamTypeMapping[resp.type],
				scope: ToolParamScopeMapping[resp.scope],
				value: undefined,
			};
		});
	};

	const mapExternalToolConfigurationTemplateResponse = (
		resp: ExternalToolConfigurationTemplateResponse
	): ToolConfigurationTemplate => {
		return {
			id: resp.id,
			name: resp.name,
			logoUrl: resp.logoUrl,
			version: resp.version,
			parameters: mapCustomParameterResponse(resp.parameters),
		};
	};

	const mapToolConfigurationEntryResponse = (
		resp: ToolConfigurationEntryResponse
	): ToolConfiguration => {
		return {
			id: resp.id,
			name: resp.name,
			logoUrl: resp.logoUrl,
		};
	};

	const mapToolConfigurationListResponse = (
		resp: ToolConfigurationListResponse
	): ToolConfiguration[] => {
		return resp.data.map(
			(entryResp: ToolConfigurationEntryResponse): ToolConfiguration => {
				return mapToolConfigurationEntryResponse(entryResp);
			}
		);
	};

	const mapToolConfigurationTemplateToSchoolExternalToolPostParams = (
		template: ToolConfigurationTemplate,
		schoolId: string
	): SchoolExternalToolPostParams => {
		return {
			toolId: template.id,
			version: template.version,
			schoolId,
			parameters: mapToolParametersToCustomParameterEntryParams(
				template.parameters
			),
		};
	};

	const mapToolParametersToCustomParameterEntryParams = (
		params: ToolParameter[]
	) => {
		return params.map((param: ToolParameter): CustomParameterEntryParam => {
			return {
				name: param.name,
				value: param.value ?? "",
			};
		});
	};

	// TODO: translate all possible errors + map
	const translateBusinessError = (t: (key: string | undefined) => string) => {
		const { message } = externalToolsModule.getBusinessError;

		const translationKey = Array.from(
			BusinessErrorMessageTranslationKeyMap.entries()
		).find(([key]) => message.startsWith(key))?.[1];

		if (translationKey) {
			return t(translationKey);
		}
		return message;
	};

	return {
		mapExternalToolConfigurationTemplateResponse,
		mapToolConfigurationListResponse,
		mapToolConfigurationTemplateToSchoolExternalToolPostParams,
		translateBusinessError,
	};
}
