import { SchoolExternalTool } from "@store/external-tool/school-external-tool.enum";
import { DataTableHeader } from "vuetify";
import ExternalToolsModule from "@store/external-tools";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import {
	SchoolExternalToolResponse,
	SchoolExternalToolResponseStatusEnum,
	SchoolExternalToolSearchListResponse,
} from "../../serverApi/v3";
import { SchoolExternalToolStatusEnum } from "@store/external-tool/school-external-tool-status.enum";

const responseStatusMapping: Record<
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

export function useSchoolExternalToolUtils(
	t: (key: string) => string = () => ""
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
			status: responseStatusMapping[toolResponse.status],
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

	const getHeaders: DataTableHeader[] = [
		{
			text: t("common.labels.name"),
			value: "name",
		},
		{
			text: t(
				"components.administration.externalToolsSection.table.header.status"
			),
			value: "status",
		},
		{
			text: "",
			value: "actions",
			sortable: false,
			align: "end",
		},
	];

	const getItems = (
		externalToolsModule: ExternalToolsModule
	): SchoolExternalToolItem[] => {
		const schoolExternalTools: SchoolExternalTool[] =
			externalToolsModule.getSchoolExternalTools;
		return schoolExternalTools.map((tool: SchoolExternalTool) => {
			const outdated: boolean =
				tool.status === SchoolExternalToolStatusEnum.Outdated;
			const status: string =
				tool.status === SchoolExternalToolStatusEnum.Latest
					? t(
							"components.administration.externalToolsSection.table.header.status.latest"
					  )
					: t(
							"components.administration.externalToolsSection.table.header.status.outdated"
					  );
			return { id: tool.id, name: tool.name, status: status, outdated };
		});
	};

	return {
		mapSchoolExternalToolSearchListResponse,
		getHeaders,
		getItems,
		mapSchoolExternalToolItemToSchoolExternalTool,
	};
}
