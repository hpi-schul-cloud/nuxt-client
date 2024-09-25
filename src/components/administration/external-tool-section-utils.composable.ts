import { SchoolExternalTool } from "@/store/external-tool";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import { DataTableHeader } from "@/store/types/data-table-header";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import { ToolContextType } from "@/serverApi/v3";

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
			title: t(
				"components.administration.externalToolsSection.table.header.restrictedTo"
			),
			value: "restrictToContexts",
			key: "restrictToContexts",
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
			if (tool.isDeactivated || tool.status.isGloballyDeactivated) {
				statusTranslationKey = "components.externalTools.status.deactivated";
			} else if (tool.status.isOutdatedOnScopeSchool) {
				statusTranslationKey = "components.externalTools.status.outdated";
			}

			let contextRestrictionTranslations = "";
			if (tool.restrictToContexts) {
				contextRestrictionTranslations = tool.restrictToContexts
					.map((context) => {
						switch (context) {
							case ToolContextType.Course:
								return t("common.tool.context.type.courses");
							case ToolContextType.MediaBoard:
								return t("common.tool.context.type.mediaShelves");
							case ToolContextType.BoardElement:
								return t("common.tool.context.type.boardElements");
							default:
								break;
						}
					})
					.join(", ");
			}

			return {
				id: tool.id,
				externalToolId: tool.toolId,
				name: tool.name,
				statusText: t(statusTranslationKey),
				isOutdated: tool.status.isOutdatedOnScopeSchool,
				isDeactivated: tool.isDeactivated || tool.status.isGloballyDeactivated,
				restrictToContexts: contextRestrictionTranslations,
			};
		});
	};

	return {
		getHeaders,
		getItems,
	};
}
