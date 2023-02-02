import {
	CustomParameterEntryParam,
	CustomParameterResponse,
	CustomParameterResponseLocationEnum,
	CustomParameterResponseScopeEnum,
	CustomParameterResponseTypeEnum,
	ExternalToolConfigurationTemplateResponse,
	SchoolExternalToolPostParams,
	SchoolExternalToolResponse,
	SchoolExternalToolResponseStatusEnum,
	SchoolExternalToolSearchListResponse,
	ToolConfigurationEntryResponse,
	ToolConfigurationListResponse,
} from "../serverApi/v3";
import { ToolParameterLocationEnum } from "@store/external-tool/tool-parameter-location.enum";
import { ToolParameterTypeEnum } from "@store/external-tool/tool-parameter-type.enum";
import { ToolParameterScopeEnum } from "@store/external-tool/tool-parameter-scope.enum";
import { ToolParameter } from "@store/external-tool/tool-parameter";
import {
	SchoolExternalTool,
	SchoolExternalToolStatusEnum,
	ToolConfiguration,
	ToolConfigurationTemplate,
} from "@store/external-tool";
import { externalToolsModule } from "@utils/store-accessor";
import VueI18n from "vue-i18n";
import { SchoolExternalToolItem } from "@components/administration/school-external-tool-item";

const ResponseStatusMapping: Record<
	SchoolExternalToolResponseStatusEnum,
	SchoolExternalToolStatusEnum
> = {
	[SchoolExternalToolResponseStatusEnum.Latest]:
		SchoolExternalToolStatusEnum.Latest,
	[SchoolExternalToolResponseStatusEnum.Outdated]:
		SchoolExternalToolStatusEnum.Outdated,
	[SchoolExternalToolResponseStatusEnum.Unknown]:
		SchoolExternalToolStatusEnum.Unknown,
};

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

export function useExternalToolUtils(
	t: (key: string, values?: VueI18n.Values | undefined) => string = () => ""
) {
	const mapSchoolExternalToolSearchListResponse = (
		response: SchoolExternalToolSearchListResponse
	): SchoolExternalTool[] => {
		const tools: SchoolExternalTool[] = response.data.map(
			(toolResponse: SchoolExternalToolResponse) =>
				mapSchoolExternalToolResponse(toolResponse)
		);
		return tools;
	};

	const mapSchoolExternalToolResponse = (
		toolResponse: SchoolExternalToolResponse
	): SchoolExternalTool => {
		return {
			id: toolResponse.id,
			name: toolResponse.name,
			version: toolResponse.toolVersion,
			status: ResponseStatusMapping[toolResponse.status],
		};
	};

	const mapSchoolExternalToolItemToSchoolExternalTool = (
		schoolExternalToolItem: SchoolExternalToolItem
	): SchoolExternalTool => {
		return {
			id: schoolExternalToolItem.id,
			name: schoolExternalToolItem.name,
			status: SchoolExternalToolStatusEnum.Unknown,
		};
	};

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

	const translateBusinessError = () => {
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
		mapSchoolExternalToolSearchListResponse,
		mapSchoolExternalToolResponse,
		mapExternalToolConfigurationTemplateResponse,
		mapToolConfigurationListResponse,
		mapToolConfigurationTemplateToSchoolExternalToolPostParams,
		mapSchoolExternalToolItemToSchoolExternalTool,
		translateBusinessError,
	};
}
