import { DataTableHeader } from "@/store/types/data-table-header";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import {
	SchoolExternalTool,
	ToolConfigurationStatus,
} from "@/store/external-tool";
import { ToolConfigurationStatusTranslationMapping } from "@/composables/external-tool-mappings.composable";
import SchoolExternalToolsModule from "@/store/school-external-tools";

export function useExternalToolsSectionUtils(
	t: (key: string) => string = () => ""
) {
	const getHeaders: DataTableHeader[] = [
		{
			title: t("common.labels.name"),
			value: "name",
			key: "name",
		},
		{
			title: t(
				"components.administration.externalToolsSection.table.header.status"
			),
			value: "status",
			key: "status",
		},
		{
			title: "",
			value: "actions",
			sortable: false,
			align: "end",
			key: "actions",
		},
	];

	const getItems = (
		schoolExternalToolsModule: SchoolExternalToolsModule
	): SchoolExternalToolItem[] => {
		const schoolExternalTools: SchoolExternalTool[] =
			schoolExternalToolsModule.getSchoolExternalTools;
		return schoolExternalTools.map((tool: SchoolExternalTool) => {
			const outdated: boolean =
				tool.status === ToolConfigurationStatus.Outdated;
			const statusTranslationKey: string =
				ToolConfigurationStatusTranslationMapping[tool.status] ??
				"none.existent.key"; // VUE3_UPGRADE: need to fix reactive translations, see BC-6007

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
