import { SchoolExternalTool } from "@/store/external-tool";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import { DataTableHeader } from "@/store/types/data-table-header";
import { SchoolExternalToolItem } from "./school-external-tool-item";

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
			value: "statusText",
			key: "statusText",
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
			let statusTranslationKey = "components.externalTools.status.latest";
			if (tool.status.isDeactivated) {
				statusTranslationKey = "components.externalTools.status.deactivated";
			} else if (tool.status.isOutdatedOnScopeSchool) {
				statusTranslationKey = "components.externalTools.status.outdated";
			}

			return {
				id: tool.id,
				externalToolId: tool.toolId,
				name: tool.name,
				statusText: t(statusTranslationKey),
				isOutdated: tool.status.isOutdatedOnScopeSchool,
				isDeactivated: tool.status.isDeactivated,
			};
		});
	};

	return {
		getHeaders,
		getItems,
	};
}
