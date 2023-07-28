import { DataTableHeader } from "vuetify";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import ExternalToolsModule from "@/store/external-tools";
import {
	SchoolExternalTool,
	ToolConfigurationStatus,
} from "@/store/external-tool";
import { ToolConfigurationStatusTranslationMapping } from "@/composables/external-tool-mappings.composable";

export function useExternalToolsSectionUtils(
	t: (key: string) => string = () => ""
) {
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
				tool.status === ToolConfigurationStatus.Outdated;
			const statusTranslationKey: string =
				ToolConfigurationStatusTranslationMapping[tool.status];

			return {
				id: tool.id,
				name: tool.name,
				status: t(statusTranslationKey),
				outdated,
			};
		});
	};

	return {
		getHeaders,
		getItems,
	};
}
