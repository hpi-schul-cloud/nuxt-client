import {
	SchoolExternalToolMediumResponse,
	ToolContextType,
} from "@/serverApi/v3";
import { SchoolExternalTool } from "@/store/external-tool";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import { DataTableHeader } from "@/types/vuetify";
import { SchoolExternalToolItem } from "./school-external-tool-item";

export function useExternalToolsSectionUtils(
	t: (key: string) => string = () => "",
	mediaLicenseEnabled = false
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

	const mediumSortFn = (
		a?: SchoolExternalToolMediumResponse,
		b?: SchoolExternalToolMediumResponse
	): number => {
		if (a === undefined) return 1;
		if (b === undefined) return -1;
		if (a.mediaSourceName === undefined) return 1;
		if (b.mediaSourceName === undefined) return -1;
		return a.mediaSourceName.localeCompare(b.mediaSourceName);
	};

	if (mediaLicenseEnabled) {
		getHeaders.splice(2, 0, {
			title: t(
				"components.administration.externalToolsSection.table.header.medium"
			),
			value: "medium",
			key: "medium",
			sort: mediumSortFn,
		});
	}

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
				medium: tool.medium,
			};
		});
	};

	return {
		getHeaders,
		getItems,
		mediumSortFn,
	};
}
