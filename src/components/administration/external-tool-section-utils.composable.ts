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
			const outdated: boolean = tool.status.isOutdatedOnScopeSchool;
			const statusTranslationKey: string = tool.status.isOutdatedOnScopeSchool
				? "components.externalTools.status.outdated"
				: "components.externalTools.status.latest";

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
