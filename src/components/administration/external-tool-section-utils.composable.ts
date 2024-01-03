import { DataTableHeader } from "vuetify";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import { SchoolExternalTool } from "@/store/external-tool";
import SchoolExternalToolsModule from "@/store/school-external-tools";

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
