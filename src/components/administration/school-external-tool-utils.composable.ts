import {
	SchoolExternalToolSearchListResponse
} from "@store/school-external-tool/school-external-tool-search-list.response";
import { SchoolExternalToolStatus, SchoolExternalTool } from "@store/types/school-external-tool";
import { SchoolExternalToolResponse } from "@store/school-external-tool/school-external-tool.response";
import { SchoolExternalToolStatusResponse } from "@store/school-external-tool/school-external-tool-status.response";
import { DataTableHeader } from "vuetify";
import ExternalToolsModule from "@store/external-tools";
import { SchoolExternalToolItem } from "./school-external-tool-item";

export function useSchoolExternalToolUtils(t: (key: string) => string = () => "") {
	const statusMapping: Record<SchoolExternalToolStatusResponse, SchoolExternalToolStatus> = {
		[SchoolExternalToolStatusResponse.LATEST]: SchoolExternalToolStatus.Latest,
		[SchoolExternalToolStatusResponse.OUTDATED]: SchoolExternalToolStatus.Outdated,
		[SchoolExternalToolStatusResponse.UNKNOWN]: SchoolExternalToolStatus.Unknown,
	};

	const mapSchoolExternalToolSearchListResponse = (
		response: SchoolExternalToolSearchListResponse
	): SchoolExternalTool[] => {
		const tools: SchoolExternalTool[] = response.data.map(
			(toolResponse: SchoolExternalToolResponse) => mapSchoolExternalToolResponse(toolResponse)
		);
		return tools;
	};

	const mapSchoolExternalToolResponse = (
		toolResponse: SchoolExternalToolResponse
	): SchoolExternalTool => {
		return {
			id: toolResponse.toolId,
			name: toolResponse.name,
			version: toolResponse.toolVersion,
			status: statusMapping[toolResponse.status],
		}
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
			width: "90px",
		},
	];

	const getItems = (externalToolsModule: ExternalToolsModule): SchoolExternalToolItem[] => {
		return externalToolsModule.getSchoolExternalTools.map(
			(tool: SchoolExternalTool) => {
				const outdated: boolean = tool.status === SchoolExternalToolStatus.Outdated;
				const status: string =
					tool.status === SchoolExternalToolStatus.Latest
						? t(
							"components.administration.externalToolsSection.table.header.status.latest"
						)
						: t(
							"components.administration.externalToolsSection.table.header.status.outdated"
						);
				return { id: tool.id, name: tool.name, status: status, outdated };
			}
		);
	}

	return {
		mapSchoolExternalToolSearchListResponse,
		getHeaders,
		getItems,
	}
}
